import { Request, Response } from "express";
import OpenAI from "openai";
import { query } from "../db";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const streamChat = async (req: Request, res: Response) => {
  const { doctorId, message } = req.body;

  if (!doctorId || !message) {
    return res.status(400).json({ error: "Missing doctorId or message" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const { rows } = await query(`SELECT chats FROM doctors WHERE id = $1`, [
      doctorId,
    ]);

    const previousChats = rows[0]?.chats || [];

    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages: [...previousChats, { role: "user", content: message }],
    });

    let assistantMessage = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        assistantMessage += content;
        res.write(`data: ${content}\n\n`);
      }
    }

    await query(
      `
      UPDATE doctors
      SET
        chats = chats || $1::jsonb,
        updated_at = NOW()
      WHERE id = $2;

    `,
      [
        JSON.stringify([
          { role: "user", content: message },
          { role: "assistant", content: assistantMessage },
        ]),
        doctorId,
      ],
    );

    res.write("event: end\ndata: done\n\n");
    res.end();
  } catch (err) {
    console.error(err);
    res.write("event: error\ndata: failed\n\n");
    res.end();
  }
};

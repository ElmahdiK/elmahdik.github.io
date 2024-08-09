import { defineAction, z } from "astro:actions";

export const server = {
  sendEmail: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      message: z.string(),
    }),
    handler: async (sendEmail) => {
      // call a mailing service, or store to a database
      return { success: sendEmail };
    },
  }),
};

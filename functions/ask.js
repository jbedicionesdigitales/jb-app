export async function onRequestPost(context) {
  try {
    const { question } = await context.request.json();

    if (!question) {
      return Response.json({ answer: "Escribí una pregunta para poder ayudarte." });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": Bearer ${context.env.OPENAI_API_KEY},
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: "Sos el asistente oficial de JB Ediciones Digitales. Respondé en español, de forma clara, comercial y útil. Ayudás con recetas, cocina saludable, pastelería, galletitas estilo New York, recetas sin TACC, e-books, planes y recomendaciones."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await response.json();

    const answer =
      data.output?.[0]?.content?.[0]?.text ||
      "No pude generar una respuesta en este momento.";

    return Response.json({ answer });
  } catch (error) {
    return Response.json({
      answer: "Hubo un error al conectar con la IA. Revisá la configuración."
    });
  }
}

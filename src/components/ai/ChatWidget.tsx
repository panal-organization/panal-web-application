import { useState } from "react";
import "./ChatWidget.css";
import { FiMessageCircle } from "react-icons/fi";

type DraftPreview = {
  titulo: string;
  descripcion: string;
  prioridad: string;
  categoria: string;
};

type SummaryPreview = {
  resumen: string;
};

type MessageData = {
  draft_preview?: DraftPreview;
  summary_preview?: SummaryPreview;
  message?: string;
  ai_log_id?: string;
};

type Message = {
  text: string;
  sender: "user" | "ai";
  data: MessageData | null;
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hola 👋 ¿en qué puedo ayudarte?",
      sender: "ai",
      data: null,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 SPINNER

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user", data: null },
    ]);

    setInput("");
    setLoading(true); // 🔥 INICIA SPINNER

    try {
      const response = await fetch(
        "https://except-preview-systematic-acids.trycloudflare.com/api/ai/agent/plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            text: userMessage,
          }),
        }
      );

      const data: MessageData = await response.json();

      console.log("IA RESPONSE:", data);

      setMessages((prev) => [
        ...prev,
        {
          text: data.message || "",
          sender: "ai",
          data: data,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Error al conectar con IA",
          sender: "ai",
          data: null,
        },
      ]);
    } finally {
      setLoading(false); // 🔥 TERMINA SPINNER
    }
  };

  const handleConfirm = async (data: MessageData | null) => {
    if (!data) return;

    const aiLogId = data.ai_log_id;
    const draft = data.draft_preview;

    if (!aiLogId || !draft) {
      setMessages((prev) => [
        ...prev,
        {
          text: "No se pudo crear el ticket",
          sender: "ai",
          data: null,
        },
      ]);
      return;
    }

    try {
      const response = await fetch(
        "https://except-preview-systematic-acids.trycloudflare.com/api/tickets/from-ai-draft",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ai_log_id: aiLogId,
            titulo: draft.titulo,
            descripcion: draft.descripcion,
            prioridad: draft.prioridad,
            categoria: draft.categoria,
          }),
        }
      );

      const result = await response.json();

      const currentWorkspace = JSON.parse(
        localStorage.getItem("workspace") || "{}"
      );

      if (String(result.workspace_id) !== String(currentWorkspace._id)) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Ticket creado en: Producción personal :/",
            sender: "ai",
            data: null,
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          text: "Ticket creado correctamente",
          sender: "ai",
          data: null,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Error al crear el ticket.",
          sender: "ai",
          data: null,
        },
      ]);
    }
  };

  return (
    <>
      {/* BOTÓN */}
      <button className="chat-button" onClick={() => setOpen(!open)}>
        <FiMessageCircle size={24} />
      </button>

      {/* CHAT */}
      {open && (
        <div className="chat-container">
          <div className="chat-header">Asistente IA</div>

          <div className="chat-body">
            {messages.map((msg, index) => {
              const draft = msg.data?.draft_preview;
              const summary = msg.data?.summary_preview;

              return (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.sender === "user" ? "user" : "ai"
                  }`}
                >
                  {/* 🟢 DRAFT */}
                  {draft ? (
                    <div className="chat-card">
                      <strong>{draft.titulo}</strong>
                      <p>{draft.descripcion}</p>
                      <p>
                        <b>Prioridad:</b> {draft.prioridad}
                      </p>
                      <p>
                        <b>Categoría:</b> {draft.categoria}
                      </p>

                      <button
                        className="chat-confirm-btn"
                        onClick={() => handleConfirm(msg.data)}
                      >
                        Confirmar ticket
                      </button>
                    </div>
                  ) : summary ? (
                    /* 🔵 SUMMARY */
                    <div className="chat-card">
                      <strong>Resumen</strong>
                      <p>{summary.resumen}</p>
                    </div>
                  ) : (
                    msg.text || "..."
                  )}
                </div>
              );
            })}

            {/* 🔥 SPINNER TIPO CHATGPT */}
            {loading && (
              <div className="chat-message ai">
                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <input
              className="chat-input"
              placeholder="Describe tu problema..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
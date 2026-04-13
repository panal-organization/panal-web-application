import { useState, useEffect } from "react";
import "./ChatWidget.css";
import { FiMessageCircle } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";

type Draft = {
  titulo: string;
  descripcion: string;
  prioridad: string;
  categoria: string;
};

type Message = {
  text?: string;
  sender: "user" | "ai";
  draft?: Draft;
  ai_log_id?: string;
};

const ChatWidget = () => {
  const { token, user } = useAuth();
  const { workspace } = useWorkspace();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hola 👋 ¿en qué puedo ayudarte?",
      sender: "ai",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 NUEVO: estado premium
  const [isPremium, setIsPremium] = useState<boolean | null>(null);

  const FREE_PLAN_ID = "69a3de4281a5be4cb1bd8bc0";

  // ===============================
  // 🔍 VALIDAR PLAN
  // ===============================
  useEffect(() => {
    const checkPlan = async () => {
      try {
        if (!user?._id) return;

        const res = await fetch(`/api/usuarios/${user._id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        console.log("PLAN DATA:", data);

        const premium = data.plan_id !== FREE_PLAN_ID;
        setIsPremium(premium);
      } catch (err) {
        console.error(err);
        setIsPremium(false);
      }
    };

    checkPlan();
  }, [user]);

  // 🔒 BLOQUEO TOTAL
  if (isPremium === null) return null;
  if (!isPremium) return null;

  // ===============================
  // 🧠 ENVIAR MENSAJE
  // ===============================
  const handleSend = async () => {
    if (!token) {
      console.warn("❌ No hay token aún");
      return;
    }

    if (!workspace?._id) {
      console.warn("❌ No hay workspace aún");
      return;
    }

    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user" },
    ]);

    setInput("");
    setLoading(true);

    try {
      const finalToken = token?.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: finalToken || "",
        ...(workspace?._id && { "x-workspace-id": workspace._id }),
      };

      const response = await fetch("/api/ai/agent", {
        method: "POST",
        headers,
        body: JSON.stringify({
          text: userMessage,
        }),
      });

      const data = await response.json();

      if (data.action === "draft" && data.result) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            draft: data.result,
            ai_log_id: data.ai_log_id,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: data.message || "Acción realizada",
            sender: "ai",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Error al conectar con IA",
          sender: "ai",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // ✅ CONFIRMAR TICKET
  // ===============================
  const handleConfirm = async (msg: Message) => {
    if (!token || !workspace?._id) {
      console.warn("❌ Falta token o workspace");
      return;
    }

    if (!msg.draft || !msg.ai_log_id) return;

    try {
      const finalToken = token?.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: finalToken || "",
        ...(workspace?._id && { "x-workspace-id": workspace._id }),
      };

      const response = await fetch("api/tickets/from-ai-draft", {
        method: "POST",
        headers,
        body: JSON.stringify({
          ai_log_id: msg.ai_log_id,
          titulo: msg.draft.titulo,
          descripcion: msg.draft.descripcion,
          prioridad: msg.draft.prioridad,
          categoria: msg.draft.categoria,
        }),
      });

      await response.json();

      setMessages((prev) => [
        ...prev,
        {
          text: "✔ Ticket creado correctamente",
          sender: "ai",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Error al crear el ticket",
          sender: "ai",
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
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "user" ? "user" : "ai"
                }`}
              >
                {msg.draft ? (
                  <div className="chat-card">
                    <strong>{msg.draft.titulo}</strong>
                    <p>{msg.draft.descripcion}</p>
                    <p><b>Prioridad:</b> {msg.draft.prioridad}</p>
                    <p><b>Categoría:</b> {msg.draft.categoria}</p>

                    <button
                      className="chat-confirm-btn"
                      onClick={() => handleConfirm(msg)}
                    >
                      Confirmar ticket
                    </button>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            ))}

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
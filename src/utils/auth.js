import { createHmac } from "crypto";


/**
 * Calcula el SECRET_HASH para Cognito.
 * @param {string} username - El nombre de usuario.
 * @param {string} clientId - El ID del cliente de Cognito.
 * @param {string} clientSecret - La clave secreta del cliente de Cognito.
 * @returns {string} - El SECRET_HASH codificado en Base64.
 */
export const calculateSecretHash = (username, clientId, clientSecret) => {
  const message = username + clientId; // Concatena el nombre de usuario y el ID del cliente
  const key = Buffer.from(clientSecret, "utf-8"); // Convierte la clave secreta a un Buffer
  const messageBytes = Buffer.from(message, "utf-8"); // Convierte el mensaje a un Buffer

  // Calcula el HMAC-SHA256
  const hmac = createHmac("sha256", key).update(messageBytes).digest("base64");

  return hmac; // Devuelve el hash codificado en Base64
};
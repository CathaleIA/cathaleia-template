import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import outputs from '@/../amplify_outputs.json';
import { cookies } from 'next/headers';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth/server';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

export const isAuthenticated = async (): Promise<boolean> => {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        // Verifica si hay una sesión de autenticación
        const session = await fetchAuthSession(contextSpec);
        if (session.tokens && session.tokens.idToken) {
          // Si hay un token, el usuario está autenticado
          const user = await getCurrentUser(contextSpec);
          return !!user;
        }
        return false; // No hay sesión, el usuario no está autenticado
      } catch (error) {
        console.log(error);
        return false; // Devuelve false en caso de error
      }
    },
  });
};
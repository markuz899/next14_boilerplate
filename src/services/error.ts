export async function handleError(res: Response): Promise<string> {
  let errorMessage = "Errore sconosciuto";

  try {
    const errorBody = await res.json();
    errorMessage = errorBody?.error?.message || errorMessage;
  } catch {
    if (res.status === 500) {
      errorMessage = "Errore interno del server (500)";
    } else {
      errorMessage = `Errore HTTP ${res.status}`;
    }
  }

  return errorMessage;
}

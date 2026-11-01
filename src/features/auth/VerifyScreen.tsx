import { useState } from "react";
import { apiSend, isApiError } from "../../api/client";
import { errorStateMessage } from "./error";
import { strings } from "./strings";
import type { VerifyResponse } from "./types";

interface VerifyScreenProps {
  token: string | null;
  onAuthenticated: (user: VerifyResponse["user"]) => void;
  onRequestNewLink: () => void;
}

export default function VerifyScreen({
  token,
  onAuthenticated,
  onRequestNewLink,
}: VerifyScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  async function handleConfirm(): Promise<void> {
    if (!token || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    setIsInvalid(false);
    try {
      const result = await apiSend<VerifyResponse>("/auth/email/verify", "POST", { token });
      window.history.replaceState({}, "", window.location.pathname);
      onAuthenticated(result.user);
    } catch (error) {
      if (
        isApiError(error) &&
        (error.code === "UNAUTHENTICATED" ||
          error.code === "INVALID_TOKEN" ||
          error.status === 401)
      ) {
        setIsInvalid(true);
        setErrorMessage(strings.auth.verifyInvalidMessage);
      } else {
        setErrorMessage(errorStateMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const missingToken = !token;

  return (
    <main className="auth">
      <div className="auth__card auth__card--centered">
        <h1 className="auth__title">{strings.auth.verifyTitle}</h1>
        <p className="auth__subtitle">
          {missingToken
            ? strings.auth.verifyMissingTokenMessage
            : strings.auth.verifyMessage}
        </p>

        {errorMessage ? (
          <p role="alert" className="auth__error">
            {errorMessage}
          </p>
        ) : null}

        {!missingToken ? (
          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={isSubmitting}
            className="auth__button"
          >
            {isSubmitting ? strings.auth.verifyConfirming : strings.auth.verifyConfirm}
          </button>
        ) : null}

        {isInvalid || missingToken ? (
          <button
            type="button"
            onClick={onRequestNewLink}
            className="auth__button auth__button--outline auth__button--spaced"
          >
            {strings.auth.requestNewLink}
          </button>
        ) : null}
      </div>
    </main>
  );
}

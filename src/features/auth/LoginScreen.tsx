import { useState, type FormEvent } from "react";
import { apiSend, isApiError } from "../../api/client";
import { errorStateMessage } from "./error";
import { strings } from "./strings";

type LoginView = "form" | "inbox";

export default function LoginScreen() {
  const [view, setView] = useState<LoginView>("form");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function sendMagicLink(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await apiSend("/auth/email/request", "POST", { email: email.trim() });
      setView("inbox");
    } catch (error) {
      if (isApiError(error) && error.code === "RATE_LIMITED") {
        setErrorMessage(strings.errors.rateLimitedMessage);
      } else {
        setErrorMessage(errorStateMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend(): Promise<void> {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await apiSend("/auth/email/request", "POST", { email: email.trim() });
    } catch (error) {
      if (isApiError(error) && error.code === "RATE_LIMITED") {
        setErrorMessage(strings.errors.rateLimitedMessage);
      } else {
        setErrorMessage(errorStateMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth">
      <div className="auth__card">
        {view === "form" ? (
          <>
            <h1 className="auth__title">{strings.auth.loginTitle}</h1>
            <p className="auth__subtitle">{strings.auth.loginSubtitle}</p>

            {errorMessage ? (
              <p role="alert" className="auth__error">
                {errorMessage}
              </p>
            ) : null}

            <form onSubmit={(event) => void sendMagicLink(event)} noValidate>
              <label htmlFor="login-email" className="auth__label">
                {strings.auth.emailLabel}
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={strings.auth.emailPlaceholder}
                className="auth__input"
              />
              <button type="submit" disabled={isSubmitting} className="auth__button">
                {isSubmitting ? strings.auth.submitting : strings.auth.submit}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="auth__title">{strings.auth.checkInboxTitle}</h1>
            <p className="auth__subtitle">{strings.auth.checkInboxMessage}</p>

            {errorMessage ? (
              <p role="alert" className="auth__error">
                {errorMessage}
              </p>
            ) : null}

            <div className="auth__actions">
              <button
                type="button"
                onClick={() => void handleResend()}
                disabled={isSubmitting}
                className="auth__button auth__button--outline"
              >
                {isSubmitting ? strings.auth.submitting : strings.auth.resend}
              </button>
              <button
                type="button"
                onClick={() => {
                  setView("form");
                  setErrorMessage(null);
                }}
                className="auth__linkButton"
              >
                {strings.auth.backToLogin}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

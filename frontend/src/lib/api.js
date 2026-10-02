import * as Sentry from "@sentry/react";

const rawUrl = import.meta.env.VITE_API_URL;
const baseUrl = typeof rawUrl === "string" ? rawUrl.replace(/\/+\$/, "") : "";

function logSentryError(error, context, type = "network") {
  Sentry.captureException(error, {
    tags: {
      "api.fetch": type,
      ...(context.status && { "http.status": String(context.status) }),
    },
    extra: context,
  });
}

export async function apiFetch(path, opts = {}) {
  const { getToken, method = "GET", body } = opts;
  const headers = { "Content-Type": "application/json" };

  if (getToken) {
    const token = await getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    Sentry.addBreadcrumb({
      category: "api",
      message: `${method} ${baseUrl}`,
      level: "error",
      data: { network: true },
    });
    logSentryError(networkError, { path, method }, "network");
    throw networkError;
  }

  const data = await res.json();

  Sentry.addBreadcrumb({
    category: "api",
    message: `${method} ${path}`,
    level: res.ok ? "info" : "warning",
    data: { status: res.status },
  });

  if (!res.ok) {
    const errorMsg = data?.error || res.statusText || "Request failed";
    const httpError = new Error(errorMsg);

    if (res.status >= 500) {
      logSentryError(httpError, { path, method, status: res.status }, "http");
    }
    throw httpError;
  }

  return data;
}

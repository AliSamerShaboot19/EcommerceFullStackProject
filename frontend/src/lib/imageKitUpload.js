import { apiFetch } from "./api"

const UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

export async function uploadImageKit(file, getToken, opt = {}) {
  const { folder = "products", fileName } = opt;
  

  const auth = await apiFetch("/api/admin/imagekit/auth", { getToken });

  const nameFile = fileName ?? `upload-${Date.now()}.jpg`;

  const form = new FormData();
  form.append("file", file);
  form.append("fileName", nameFile);
  form.append("publicKey", auth.publicKey);
  form.append("signature", auth.signature);
  form.append("token", auth.token);
  form.append("expire", String(auth.expire));
  form.append("folder", folder);

  
  const res = await window.fetch(UPLOAD_URL, { method: "POST", body: form });
  const data = await res.json();

  if (!res.ok) {
    console.log("[Image kit]", res.status, data);
    throw new Error("Imagekit upload failed");
  }

  if (!data.url) {
    console.log("Imagekit upload missing url in response", data);
    throw new Error("Imagekit upload failed");
  }

  
  return { url: data.url, fileId: data.fileId ?? null };
}

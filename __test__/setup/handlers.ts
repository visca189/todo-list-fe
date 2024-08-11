import { http, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";

const tasks = new Map();

export const handlers = [
  http.get("/api/v1/duty", async () => {
    return HttpResponse.json(Array.from(tasks.values()));
  }),
  http.post("/api/v1/duty", async ({ request }) => {
    const { name } = (await request.json()) as { name?: string };

    if (!name) {
      return new HttpResponse(null, { status: 404 });
    }

    const id = uuidv4();
    tasks.set(id, { id, name, is_completed: false });

    return HttpResponse.json(tasks.get(id));
  }),
  http.put("/api/v1/duty/:id", async ({ request, params }) => {
    const { id } = params;
    const data = (await request.json()) as { name: string };

    const existing = tasks.get(id);
    if (!id || !data.name || !existing) {
      return new HttpResponse(null, { status: 404 });
    }

    tasks.set(id, { ...existing, ...data });

    return HttpResponse.json(tasks.get(id));
  }),
  http.delete("/api/v1/duty/:id", async ({ params }) => {
    const { id } = params;

    if (!id || !tasks.has(id)) {
      return new HttpResponse(null, { status: 404 });
    }

    const isDeleted = tasks.delete(id);

    if (isDeleted) {
      return new HttpResponse(null, { status: 204 });
    } else {
      return new HttpResponse(null, { status: 404 });
    }
  }),
];

import { useCallback, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UpdateResumePayload } from "@/types/resume";

export function useResume(id: string) {
  const qc = useQueryClient();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const query = useQuery({
    queryKey: ["resume", id],
    queryFn: () => fetch(`/api/resume/${id}`).then((r) => r.json()),
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateResumePayload) =>
      fetch(`/api/resume/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resume", id] }),
  });

  // Debounced auto-save (500ms)
  const autoSave = useCallback(
    (data: UpdateResumePayload) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => mutation.mutate(data), 500);
    },
    [mutation]
  );

  return { resume: query.data, isLoading: query.isLoading, autoSave, isSaving: mutation.isPending };
}

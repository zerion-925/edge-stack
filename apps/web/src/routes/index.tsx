import { createItemSchema, itemSearchSchema } from "@edge-stack/contracts";
import { Button } from "@edge-stack/ui/components/button";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { addItem, listItems } from "../lib/api";
import { useDensity } from "../lib/density";

export const Route = createFileRoute("/")({
  component: ItemsPage,
  validateSearch: (search) => itemSearchSchema.parse(search),
});

function ItemsPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const queryClient = useQueryClient();
  const density = useDensity((state) => state.density);
  const toggleDensity = useDensity((state) => state.toggleDensity);
  const itemsQuery = useQuery({
    queryFn: () => listItems(q),
    queryKey: ["items", q],
  });
  const createMutation = useMutation({
    mutationFn: addItem,
    onSuccess: async () => {
      form.reset();
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
  const form = useForm({
    defaultValues: { name: "" },
    onSubmit: async ({ value }) => {
      const parsed = createItemSchema.safeParse(value);
      if (parsed.success) {
        await createMutation.mutateAsync(parsed.data.name);
      }
    },
  });

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Cloudflare-first reference</p>
          <h1>Edge Stack</h1>
        </div>
        <Button
          aria-label={`Use ${density === "compact" ? "comfortable" : "compact"} density`}
          onClick={toggleDensity}
          variant="outline"
        >
          {density === "compact" ? "Roomy" : "Compact"}
        </Button>
      </header>
      <section aria-labelledby="items-title">
        <div className="intro">
          <div>
            <h2 id="items-title">Searchable items</h2>
            <p>URL search state → typed Hono RPC → Worker response.</p>
          </div>
        </div>
        <label className="field-label" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          onChange={(event) =>
            navigate({ replace: true, search: { q: event.target.value } })
          }
          placeholder="Search the stack…"
          type="search"
          value={q}
        />
        {itemsQuery.isPending ? (
          <div aria-label="Loading items" className="skeletons" role="status">
            <span />
            <span />
            <span />
          </div>
        ) : null}
        {itemsQuery.isError ? (
          <p className="error" role="alert">
            {itemsQuery.error.message}
          </p>
        ) : null}
        {itemsQuery.data?.items.length === 0 ? (
          <p className="empty">No matching items. Try a broader search.</p>
        ) : null}
        <ul className={`items ${density}`}>
          {itemsQuery.data?.items.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <time dateTime={item.createdAt}>
                {new Date(item.createdAt).toLocaleDateString()}
              </time>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="create-title" className="create-section">
        <h2 id="create-title">Add an item</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            return form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                createItemSchema.shape.name.safeParse(value).success
                  ? undefined
                  : "Enter 2 to 80 characters.",
            }}
          >
            {(field) => (
              <div className="field-grow">
                <label className="field-label" htmlFor={field.name}>
                  Name
                </label>
                <input
                  aria-describedby={`${field.name}-error`}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="e.g. Durable Objects"
                  value={field.state.value}
                />
                {field.state.meta.errors.length ? (
                  <p className="field-error" id={`${field.name}-error`}>
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button disabled={!canSubmit || isSubmitting} type="submit">
                {isSubmitting ? "Adding…" : "Add item"}
              </Button>
            )}
          </form.Subscribe>
        </form>
        {createMutation.isError ? (
          <p className="error" role="alert">
            {createMutation.error.message}
          </p>
        ) : null}
      </section>
      <footer>
        <span>Router owns URL state</span>
        <span>Query owns server state</span>
        <span>Form owns input state</span>
        <span>Zustand owns density</span>
      </footer>
    </main>
  );
}

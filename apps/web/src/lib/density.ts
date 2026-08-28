import { create } from "zustand";

interface DensityState {
  density: Density;
  toggleDensity: () => void;
}
type Density = "comfortable" | "compact";
export const useDensity = create<DensityState>((set) => ({
  density: "comfortable",
  toggleDensity: () =>
    set((state) => ({
      density: state.density === "comfortable" ? "compact" : "comfortable",
    })),
}));

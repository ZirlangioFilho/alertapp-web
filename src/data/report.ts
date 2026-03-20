import type { ButtonType } from "../constants/buttons";

export type ReportItem = {
  name: string;
  category: ButtonType;
  report: string;
  address: string;
};

export const report: ReportItem[] = [
  {
    name: "Maria da Silva",
    category: "Violência doméstica",
    report: "Relato de violência doméstica",
    address: "Rua das Flores, 123, São Paulo, SP"
  },
  {
    name: "Maria da Silva",
    category: "Violência doméstica",
    report: "Relato de violência doméstica",
    address: "Rua das Flores, 123, São Paulo, SP"
  },
  {
    name: "Ana Souza",
    category: "Relato de problemas",
    report: "Problemas com iluminação pública",
    address: "Travessa da Paz, 789, Belo Horizonte, MG"
  }
];

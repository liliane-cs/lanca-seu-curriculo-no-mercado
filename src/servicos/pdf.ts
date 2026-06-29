// src/servicos/pdf.ts

import { Curriculo } from '../tipos/curriculo';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const WEBHOOK_BASE = import.meta.env.VITE_WEBHOOK_URL;

export async function importarPDF(arquivo: File): Promise<Curriculo> {
  const arrayBuffer = await arquivo.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let textoCompleto = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const pagina = await pdf.getPage(i);
    const conteudo = await pagina.getTextContent();
    const textoPagina = conteudo.items.map((item: any) => ('str' in item ? item.str : '')).join(' ');
    textoCompleto += textoPagina + '\n';
  }

  const response = await fetch(`${WEBHOOK_BASE}/webhook/importar-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify({ texto: textoCompleto })
  });

  const data = await response.json();
  if (!data || !data.resultado) {
    throw new Error('Resposta vazia do n8n');
  }
  const textoLimpo = data.resultado.replace(/```json|```/g, '').trim();
  return JSON.parse(textoLimpo);
}

export async function exportarPDF(curriculo: Curriculo): Promise<void> {
  const elemento = document.getElementById('previa-curriculo-folha-id');
  if (!elemento) throw new Error('Prévia do currículo não encontrada');

  const html2pdf = (await import('html2pdf.js')).default;

  await (html2pdf()
    .set({
      filename: `${curriculo.dadosPessoais.nome || 'curriculo'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .from(elemento)
    .toPdf()
    .get('pdf')
    .then((pdf: any) => {
      const totalPaginas = pdf.internal.getNumberOfPages();
      for (let i = totalPaginas; i > 1; i--) {
        pdf.deletePage(i);
      }
    }) as any).save();
}

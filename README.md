# Lança - Seu Currículo no Mercado

Projeto desenvolvido para a disciplina de Inteligência Artificial, com o objetivo de ajudar candidatos a montar e adaptar currículos de forma rápida e orientada por IA, aumentando a aderência do documento às vagas desejadas.

A aplicação combina um formulário web (React) com automações de IA construídas em **n8n**, que analisam o currículo, comparam com a descrição da vaga e sugerem melhorias específicas.

## Funcionalidades principais

- **Criação de currículo:** formulário estruturado para preencher dados pessoais, perfil profissional, experiências, formação e habilidades.
- **Importar PDF:** extrai automaticamente as informações de um currículo em PDF já existente e preenche o formulário.
- **Preencher Exemplo:** preenche o formulário com um currículo de exemplo, útil para testes e demonstração.
- **Limpar Tudo:** apaga todos os campos preenchidos no formulário, com confirmação antes da ação.
- **Pré-visualização em tempo real:** exibe o currículo formatado conforme os dados são preenchidos.
- **Exportar PDF:** gera e baixa o currículo finalizado em formato PDF.
- **Adaptar para Vaga e Analisar:** envia o currículo e a descrição da vaga para o fluxo de IA (n8n), que retorna o percentual de compatibilidade, pontos fortes e sugestões de melhoria.
- **Aplicar Sugestões:** aplica diretamente no currículo as sugestões selecionadas, permitindo exportar a versão adaptada pela área principal de exportação.

## Equipe

- Liliane Costa
- José Ricardo Mello
- João Gabriel Barros
- Mateus Tamaki
- Letícia Guimarães

## Como executar localmente

**Pré-requisitos:** Node.js

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute o projeto:
   ```bash
   npm run dev
   ```

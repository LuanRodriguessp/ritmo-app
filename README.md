# Ritmo — treino pessoal

PWA em português para acompanhar um programa de musculação de segunda a sexta, registrar séries e cargas e acompanhar a conclusão dos treinos. A interface é responsiva e pode ser adicionada à tela inicial do iPhone.

## Recursos

- Ficha de hipertrofia e redução de gordura, organizada de segunda a sexta.
- Registro de carga, repetições e séries concluídas.
- Demonstrações ilustradas com posições inicial e final, além de links para vídeos.
- Alternativas de exercício, edição dos dias de treino e histórico semanal.
- Salvamento local e suporte offline após os arquivos serem carregados.

## Executar localmente

Requisitos: Node.js instalado. O projeto não precisa instalar dependências.

```bash
npm run dev
```

Abra `http://localhost:4173`. O servidor também mostra um endereço de rede local que pode ser aberto em outro aparelho conectado ao mesmo Wi-Fi.

## Publicar no GitHub Pages

O site é estático; não é necessário executar `npm run dev` no GitHub nem configurar um processo de build.

1. Crie um repositório no GitHub. Se usar o plano gratuito, deixe-o público.
2. Envie o conteúdo desta pasta para a raiz do repositório, incluindo `assets/`, `manifest.webmanifest`, `sw.js` e `icon.svg`.
3. No repositório, acesse **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, selecione `main` e a pasta `/(root)`, e salve.
5. Aguarde a publicação e abra o endereço mostrado pelo GitHub, normalmente `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

O GitHub Pages fornece HTTPS, necessário para o service worker e a instalação do PWA. Em atualizações futuras, envie as alterações para a branch publicada; o Pages fará um novo deploy.

## Instalar no iPhone

1. Abra o endereço HTTPS publicado no Safari.
2. Toque em **Compartilhar** e escolha **Adicionar à Tela de Início**.
3. Abra o Ritmo pelo ícone criado na tela inicial.

## Dados e privacidade

Os treinos são armazenados no `localStorage` do navegador. Não há conta, servidor ou sincronização entre dispositivos. Dados guardados em `localhost` não são compartilhados com o endereço do GitHub Pages; cada endereço e aparelho tem seu próprio armazenamento. Limpar os dados do navegador também pode apagar o histórico.

## Imagens e segurança

As imagens de exercícios são do [Free Exercise DB](https://github.com/yuhonas/free-exercise-db), disponibilizadas sob a licença [Unlicense](https://unlicense.org/). Consulte [FONTES.md](FONTES.md) para mais detalhes.

A ficha é um ponto de partida geral, não substitui avaliação individual de um profissional de educação física ou orientação médica. Interrompa exercícios que causem dor aguda ou sintomas preocupantes.
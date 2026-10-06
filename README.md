# Ritmo — treino pessoal

PWA em React e TypeScript para acompanhar um programa de musculação de segunda a sexta, registrar séries e cargas e acompanhar a conclusão dos treinos. A interface é responsiva e pode ser adicionada à tela inicial do iPhone.

## Recursos

- Ficha de hipertrofia e redução de gordura, organizada de segunda a sexta.
- Registro de carga, repetições e séries concluídas, com reordenação dos exercícios por arrasto (mouse, toque ou teclado) salva por dia de treino.
- Demonstrações ilustradas com posições inicial e final, além de links para vídeos.
- Alternativas de exercício, edição dos dias de treino e histórico semanal.
- Salvamento local e suporte offline após os arquivos serem carregados.

## Executar localmente

Requisitos: Node.js 20.19+ ou 22.12+ e npm.

```bash
npm ci
npm run dev
```

Abra `http://localhost:4173`. O servidor também mostra um endereço de rede local que pode ser aberto em outro aparelho conectado ao mesmo Wi-Fi.

```bash
npm test
npm run build
npm run preview
```

`npm run build` executa os testes unitários e a checagem de tipos antes de gerar `dist/`; se algum deles falhar, o build para. O Vite inclui os assets locais, e o service worker gerado pelo plugin PWA mantém a interface e as imagens disponíveis offline após o primeiro carregamento. Os dados continuam na chave `ritmo-training-log-v1` do `localStorage`; a migração não apaga registros anteriores no mesmo endereço.

## Publicar no GitHub Pages

O site é estático, mas agora precisa ser compilado antes da publicação. O workflow em `.github/workflows/deploy.yml` executa testes e build e publica `dist/`.

1. Crie um repositório no GitHub. Se usar o plano gratuito, deixe-o público.
2. Envie o projeto para a branch `main`, incluindo `assets/`, `package-lock.json` e `.github/workflows/deploy.yml`.
3. No repositório, acesse **Settings → Pages**.
4. Em **Build and deployment**, escolha **GitHub Actions** como origem.
5. Aguarde a execução do workflow e abra o endereço mostrado pelo GitHub, normalmente `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

O GitHub Pages fornece HTTPS, necessário para o service worker e a instalação do PWA. Em atualizações futuras, envie as alterações para a branch publicada; o Pages fará um novo deploy.

## Instalar no iPhone

1. Abra o endereço HTTPS publicado no Safari.
2. Toque em **Compartilhar** e escolha **Adicionar à Tela de Início**.
3. Abra o Ritmo pelo ícone criado na tela inicial.

Se um ícone antigo abrir **Not Found**, acesse o endereço publicado no Safari com internet para atualizar o PWA e tente o ícone novamente. Não apague o aplicativo instalado antes de preservar seu histórico: ele fica armazenado somente no aparelho e pode ser perdido na reinstalação.

## Dados e privacidade

Os treinos são armazenados no `localStorage` do navegador. Não há conta, servidor ou sincronização entre dispositivos. Dados guardados em `localhost` não são compartilhados com o endereço do GitHub Pages; cada endereço e aparelho tem seu próprio armazenamento. Limpar os dados do navegador também pode apagar o histórico.

## Imagens e segurança

As imagens de exercícios são do [Free Exercise DB](https://github.com/yuhonas/free-exercise-db), disponibilizadas sob a licença [Unlicense](https://unlicense.org/). Consulte [FONTES.md](FONTES.md) para mais detalhes.

A ficha é um ponto de partida geral, não substitui avaliação individual de um profissional de educação física ou orientação médica. Interrompa exercícios que causem dor aguda ou sintomas preocupantes.
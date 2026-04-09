# COPY REVIEW — P1 Calculadora de Precificação
Data: 2026-04-09 | Revisor: Crescendo (Growth)
Commit reviewed: 47acb2b

## Resumo
Scaffold funcional com lógica de pricing correta. Copy do Hero precisa de alinhamento com copy spec P1 (commit `dd0ac17` no firm).

## Hero.tsx — Gaps vs Copy Spec

| Item | Status | Nota |
|------|--------|------|
| A/B variant routing | ❌ Faltando | Copy spec prevê Variant A vs B — infraestrutura não existe |
| SocialProofCounter | ❌ Hardcoded | `+2.400` fixo no HTML — deve ser componente dinâmico |
| CTA copy | ⚠️ Parcial | "Calcular meu preço grátis" vs spec "Descubra seu preço real — grátis" |
| Promise free tier | ✅ Alinhado | "3 cálculos gratuitos por mês · Sem cadastro" correto |

## Calculator.tsx

| Item | Status |
|------|--------|
| Freemium 3/mês | ✅ |
| Pay-per-use R$1,50 | ✅ |
| Mensal R$9,90 | ✅ |
| Breakdown de cálculo | ✅ |
| Upgrade CTA pós-resultado | ⚠️ Não verificado |

## Copy spec de referência
Firm: `docs/products/p1-calculadora-precificacao/copy-spec.md` commit `dd0ac17`

## Status: READY para implementação
Awaiting: Axion implement A/B variant routing + SocialProofCounter

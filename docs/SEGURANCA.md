# Segurança — escopo exato do Beta 3.0

**Classificação:** DEMONSTRAÇÃO LOCAL. Não é plataforma para dados sensíveis nem ambiente de produção.

## Medidas aplicadas
- Sem login falso, sem coleta de senhas bancárias, sem credenciais de APIs embutidas e sem integração financeira autorizada.
- Dados iniciais fictícios; armazenamento local de demonstração opt-in via navegador quando a preferência de retenção for habilitada.
- CSP restritiva e headers de segurança no servidor de desenvolvimento local; servidor na interface loopback (`127.0.0.1`) por padrão.
- Arquivos estáticos e endpoints fixos com allowlists; notícias por provedores predefinidos, respostas JSON de tamanho limitado, limites de resposta/tempo; sem URL arbitrária passada à API (mitiga SSRF).
- Dados dinâmicos do usuário apresentados com escape de HTML; links de notícias restritos ao esquema HTTPS e abertos com rel noopener noreferrer.
- Comparações e relatórios numéricos rotulados como hipotéticos e não como recomendações individuais.

## Lacunas bloqueadoras para produção
- Sem autenticação e autorização real; sem isolamento por usuário; sem banco de dados privado ou criptografia ponta a ponta de registros financeiros.
- Sem pentest, revisão completa OWASP ASVS, gestão formal de vulnerabilidades, modelagem de ameaças revisada, monitoramento de segurança ou proteção contra abuso em ambientes públicos.
- O modo offline de arquivo único tem política CSP diferente para permitir scripts embutidos no arquivo; foi desenvolvido para visualização particular e **não deve ser hospedado como aplicação financeira**.
- O RSS de fontes externas é um mecanismo leve para demonstração e precisa de reimplementação com parser robusto, termos de uso validados e tratamento de disponibilidade/limites antes de produção.
- A origem de dados por APIs e licenças deve ser contratada para redistribuição comercial; sem aprovação regulatória para aconselhamento de investimentos.

## Antes do lançamento
Implementar backend com autenticação, testes de autorização por usuário, observabilidade, consentimento LGPD, política real de privacidade e retenção, esquema de backup/restore, modelagem monetária de precisão auditada, scan de dependências, integração contínua e testes automatizados de segurança. Fazer auditoria externa e análise jurídica aplicável ao público-alvo brasileiro e demais países.

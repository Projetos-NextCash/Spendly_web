-- Políticas de segurança RLS para a tabela objetivo_financeiro
-- Como estamos usando autenticação customizada via backend, vamos permitir todas as operações
-- O controle de acesso é feito no backend Node.js

-- Habilitar RLS na tabela objetivo_financeiro
ALTER TABLE objetivo_financeiro ENABLE ROW LEVEL SECURITY;

-- Política permissiva para desenvolvimento - REMOVER EM PRODUÇÃO
CREATE POLICY "Allow all operations for development" ON objetivo_financeiro
FOR ALL USING (true);

-- Políticas para a tabela usuarios
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on usuarios for development" ON usuarios
FOR ALL USING (true);

-- Políticas para a tabela transacao
ALTER TABLE transacao ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on transacao for development" ON transacao
FOR ALL USING (true);
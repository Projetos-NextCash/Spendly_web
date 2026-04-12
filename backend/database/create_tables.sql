-- SQL script to create the required tables for the Spendly application
-- Run this in your Supabase SQL editor or database

-- Create usuarios table
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT NOW()
);

-- Create transacao table
CREATE TABLE IF NOT EXISTS transacao (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Receita', 'Despesa')),
    data_transacao DATE NOT NULL,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    data_criacao TIMESTAMP DEFAULT NOW()
);

-- Create objetivo_financeiro table (nome correto usado no código)
CREATE TABLE IF NOT EXISTS objetivo_financeiro (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    valor_meta DECIMAL(10,2) NOT NULL,
    valor_atual DECIMAL(10,2) DEFAULT 0,
    data_inicio DATE,
    data_limite DATE,
    data_criacao TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transacao_id_usuario ON transacao(id_usuario);
CREATE INDEX IF NOT EXISTS idx_transacao_data_transacao ON transacao(data_transacao);
CREATE INDEX IF NOT EXISTS idx_objetivos_id_usuario ON objetivo_financeiro(id_usuario);
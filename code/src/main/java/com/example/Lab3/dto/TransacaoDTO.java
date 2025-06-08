package com.example.Lab3.dto;

import java.time.LocalDateTime;

public class TransacaoDTO {

    private Long id;
    private LocalDateTime data;
    private int quantidade;
    private String motivo;
    private String professorNome;
    private String alunoNome;
    private String empresaNome;
    private String vantagemNome;
    private Long codigo;
    private String tipoTransacao;
    private String vantagemFotoUrl;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getProfessorNome() {
        return professorNome;
    }

    public void setProfessorNome(String professorNome) {
        this.professorNome = professorNome;
    }

    public String getEmpresaNome() {
        return empresaNome;
    }

    public void setEmpresaNome(String empresaNome) {
        this.empresaNome = empresaNome;
    }

    

    public Long getCodigo() {
        return codigo;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public String getTipoTransacao() {
        return tipoTransacao;
    }

    public void setTipoTransacao(String tipoTransacao) {
        this.tipoTransacao = tipoTransacao;
    }

    public String getAlunoNome() {
        return alunoNome;
    }

    public void setAlunoNome(String alunoNome) {
        this.alunoNome = alunoNome;
    }

    public String getVantagemFotoUrl() {
        return vantagemFotoUrl;
    }

    public void setVantagemFotoUrl(String vantagemFotoUrl) {
        this.vantagemFotoUrl = vantagemFotoUrl;
    }

    public String getVantagemNome() {
        return vantagemNome;
    }

    public void setVantagemNome(String vantagemNome) {
        this.vantagemNome = vantagemNome;
    }
}

package com.example.Lab3.model;

import java.time.LocalDateTime;
import java.util.Random;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

@Entity
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Professor professor;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;

    private int quantidade;
    private String motivo;
    private LocalDateTime data;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "vantagem_id")  
    private Vantagem vantagem;
    private Long codigo;

    private String tipoTransacao;

    @PrePersist
    private void gerarCodigoSeResgate() {
        if (isResgate() && this.codigo == null) {
            this.codigo = gerarNumeroAleatorio();
        }
    }

    private boolean isResgate() {
        return "RESGATE".equalsIgnoreCase(this.tipoTransacao);
    }

    private Long gerarNumeroAleatorio() {
        long min = 1_000_000_000L;
        long max = 9_999_999_999L;
        return min + (long) (new Random().nextDouble() * (max - min));
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
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

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public Vantagem getVantagem() {
        return vantagem;
    }

    public void setVantagem(Vantagem vantagem) {
        this.vantagem = vantagem;
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
}

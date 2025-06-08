package com.example.Lab3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Lab3.model.Aluno;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    @Modifying
    @Query("UPDATE Aluno SET saldoMoedas = saldoMoedas + :quantidade WHERE id = :id")
    void creditarSaldo(@Param("id") Long id, @Param("quantidade") int quantidade);

    @Modifying
    @Query("UPDATE Aluno SET saldoMoedas = saldoMoedas - :quantidade WHERE id = :id AND saldoMoedas >= :quantidade")
    int debitarSaldo(@Param("id") Long id, @Param("quantidade") int quantidade);
}

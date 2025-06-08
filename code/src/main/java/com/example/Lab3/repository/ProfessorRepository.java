package com.example.Lab3.repository;

import com.example.Lab3.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    @Modifying
    @Query("UPDATE Professor SET saldoMoedas = saldoMoedas - :quantidade WHERE id = :id AND saldoMoedas >= :quantidade")
    int debitarSaldo(@Param("id") Long id, @Param("quantidade") int quantidade);
}

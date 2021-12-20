package com.bsuir.mercury.repository;

import com.bsuir.mercury.entity.CasinoBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankRepository extends JpaRepository<CasinoBank, Long> {

}

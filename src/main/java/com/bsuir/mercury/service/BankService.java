package com.bsuir.mercury.service;

import com.bsuir.mercury.entity.CasinoBank;
import com.bsuir.mercury.repository.BankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankService {
    @Autowired
    private BankRepository bankRepository;

    public void createBankIfNotExists(){
        if (bankRepository.findAll().size() == 0){
            CasinoBank casinoBank = new CasinoBank();
            casinoBank.setSum(100000.0);
            bankRepository.save(casinoBank);
        }
    }

    public CasinoBank findBank(){
        return bankRepository.findAll().get(0);
    }

    public CasinoBank saveBank(CasinoBank bank){
        return bankRepository.save(bank);
    }
}

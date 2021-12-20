package com.bsuir.mercury.service;

import com.bsuir.mercury.entity.Operation;
import com.bsuir.mercury.repository.OperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class OperationService {
    @Autowired
    private OperationRepository operationRepository;

    public Operation findOperationById(Long operationId){
        return operationRepository.findByOperationId(operationId);
    }

    public Set<Operation> findAllByUserId(Long userId){
        return operationRepository.findAllByUserIdOrderByOperationId(userId);
    }

    public List<Operation> findAll(){
        return operationRepository.findAll();
    }
}

package com.bsuir.mercury.repository;

import com.bsuir.mercury.entity.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {
    Operation findByOperationId(Long operationId);
    Set<Operation> findAllByUserIdOrderByOperationId(Long userId);
}

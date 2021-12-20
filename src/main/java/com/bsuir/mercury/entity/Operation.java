package com.bsuir.mercury.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Operation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long operationId;
    private Integer number;
    private String color;
    private Double sum;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    private User user;
}

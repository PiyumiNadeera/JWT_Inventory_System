package com.jwt_projects.jwt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jwt_projects.jwt.entity.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item,Long>{
    
}

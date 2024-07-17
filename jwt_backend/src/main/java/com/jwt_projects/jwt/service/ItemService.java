package com.jwt_projects.jwt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.jwt_projects.jwt.entity.Item;

@Service
public interface ItemService {

    List<Item> getAllItems();
    Item getItemById(Long id);
    Item createItem(Item item);
    Item updateItem(Long id,Item item);
    void deleteItem(Long id);
    
    
}

package com.jwt_projects.jwt.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwt_projects.jwt.entity.Item;
import com.jwt_projects.jwt.repository.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService {

    private ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository){
        this.itemRepository = itemRepository;
    }

    
    @Override
    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }

    @Override
    public Item getItemById(Long id){
        return itemRepository.findById(id).orElse(null);
    }

    @Override
    public Item createItem(Item item){
        return itemRepository.save(item);
    }
    
    @Override
    public Item updateItem(Long id,Item item){
        Item newItem =itemRepository.findById(id).orElse(null);

        if(newItem!=null){
            newItem.setName(item.getName());
            newItem.setPrice(item.getPrice());
            newItem.setQuantity(item.getQuantity());
        

        return itemRepository.save(newItem);
    }else{
        return null;
    }
    
    }

    @Override
    public void deleteItem(Long id){
         itemRepository.deleteById(id);
    }
    
}

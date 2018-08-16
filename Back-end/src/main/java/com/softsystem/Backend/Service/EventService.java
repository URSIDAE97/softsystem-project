package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Repository.EventRepository;
import com.softsystem.Backend.Repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private TypeRepository typeRepository;

    public List<Event> findAll() {

        return eventRepository.findAll();
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public Event getOne(Long id) {

        return eventRepository.getOne(id);
    }


    public void updateEvent(Event event) {
        this.getOne(event.getId()).setName(event.getName());
        this.getOne(event.getId()).setName(event.getName());
        eventRepository.save(this.getOne(event.getId()));
    }

    public void addEvent(Event event, Type selectedDiscipline, List<Member> selectedMembers) {
        Event newEvent = new Event();
        Type type = new Type();
        Member members = new Member();
        newEvent.setName(event.getName());
        newEvent.setBeginDate(event.getBeginDate());
        newEvent.setEndDate(event.getEndDate());
        newEvent.setActive(event.isActive());
        type = typeRepository.findByDiscipline(selectedDiscipline.getDiscipline());
        newEvent.setType(type);
        newEvent.setMembers(selectedMembers);
        eventRepository.save(newEvent);
    }

    public List<Event> findActiveEvents(String chosenDiscipline) {
        List<Event> eventList;
        if(chosenDiscipline.equals("Wszystkie")) {
            eventList = eventRepository.findAll()
                    .stream()
                    .filter(this::isActive)
                    .collect(Collectors.toList());
        } else {
            eventList = eventRepository.findAll()
                    .stream()
                    .filter(this::isActive)
                    .filter(x -> x.getType().getDiscipline().equals(chosenDiscipline))
                    .collect(Collectors.toList());
        }

        return eventList;
    }

    private boolean isActive(Event event) {

        return event.isActive();
    }

}

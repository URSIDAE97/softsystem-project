package com.softsystem.Backend.Model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Role")
public class Role {
    @Id
    @SequenceGenerator(name="role_id_sequence", sequenceName = "role_seq", initialValue = 2, allocationSize = 1)
    @GeneratedValue(generator = "role_id_sequence", strategy = GenerationType.SEQUENCE)
    @Column(name = "rol_user")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "role")
    private List<User> users;

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

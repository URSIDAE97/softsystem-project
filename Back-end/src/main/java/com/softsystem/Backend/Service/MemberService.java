package com.softsystem.Backend.Service;

import com.softsystem.Backend.DTO.MemberDTO;
import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository){
        this.memberRepository=memberRepository;
    }

    public Collection <Member> getAllTeams(){
        Collection<Member> teams;
        teams = memberRepository.findAll().stream().filter(this::isTeam).collect(Collectors.toList());
        return teams;
    }

    public void addTeam(String name){
        Member member = new Member();
        // member.setType(MemberType.Team);
        member.setName(name);

        memberRepository.saveAndFlush(member);
    }

    public void deleteMember(Long id){memberRepository.deleteById(id);}

    private boolean isTeam(Member member){
        if (member.getType()!=null)
            return member.getType().getId().equals((long)1);
        else return true;
    }
}

package com.softsystem.backend.service;

import com.softsystem.backend.model.Bet;
import com.softsystem.backend.model.Event;
import com.softsystem.backend.model.User;
import com.softsystem.backend.repository.BetRepository;
import com.softsystem.backend.repository.EventRepository;
import com.softsystem.backend.repository.MemberRepository;
import com.softsystem.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private MemberRepository memberRepository;

    public int addBet(Bet bet) {
        Date sysDate = new Date();
        User currentUser = userRepository.findUserById(bet.getUser().getId());

        if(eventRepository.getOne(bet.getEvent().getId()).getEndDate().before(sysDate)) { return 1; }
        if(!currentUser.getActivated()) { return 2; }
        Bet newBet = new Bet();
        newBet.setUser(userRepository.findUserById(bet.getUser().getId()));
        newBet.setEvent(bet.getEvent());
        newBet.setMember(memberRepository.getOne(bet.getMember().getId()));
        newBet.setBetResult(null);
        newBet.setAmount(bet.getAmount());
        if (bet.getGeneral()) {
            newBet.setGeneral(true);
        } else {
            newBet.setGeneral(false);
            newBet.setResult(bet.getResult());
        }
        betRepository.save(newBet);

        return 0;
    }

    public List<Bet> showAllBets(Long userId) {

        return betRepository.findAllBetsByUserId(userId);
    }

    public List<Bet> findMatchingBets(String chosenStatus, Long currentUser) {
        List<Bet> betList;
        Boolean active;

        if(chosenStatus.equals("Wszystkie")) {
            betList = showAllBets(currentUser);
        } else if(chosenStatus.equals("Wygrane")) {
            active = this.isActive(chosenStatus);
            betList = showAllBets(currentUser)
                    .stream().filter(x -> x.getBetResult() == active)
                    .collect(Collectors.toList());
        } else if(chosenStatus.equals("Przegrane")) {
            active = this.isActive(chosenStatus);
            betList = showAllBets(currentUser)
                    .stream().filter(x -> x.getBetResult() == active)
                    .collect(Collectors.toList());
        } else {
            active = this.isActive(chosenStatus);
            betList = showAllBets(currentUser)
                    .stream().filter(x -> x.getBetResult() == active)
                    .collect(Collectors.toList());
        }

        return betList;
    }

    private Boolean isActive(String chosenStatus) {
        if(chosenStatus.equals("Wygrane")) { return true; }
        else if (chosenStatus.equals("Przegrane")){ return false; }
        else { return null; }
    }

    public void resolveBets(Event event) {
        int i;
        Bet bets[] = betRepository.getAllByEvent(event.getId());

        if(bets.length != 0) {
            for(i = 0; i < bets.length; i++) {
                Bet currentBet = bets[i];
                if(currentBet.getGeneral()) {
                    if(currentBet.getMember() == null) {
                        if(event.getWinner().equals("Remis")) { currentBet.setBetResult(true); }
                        else { currentBet.setBetResult(false); }
                    } else {
                        if(currentBet.getMember().getName().equals(event.getWinner())) { currentBet.setBetResult(true); }
                        else { currentBet.setBetResult(false); }
                    }
                } else {
                    if(currentBet.getMember() == null) {
                        if(event.getWinner().equals("Remis") && currentBet.getResult().equals(event.getScore())) {currentBet.setBetResult(true); }
                        else { currentBet.setBetResult(false); }
                    } else {
                        if(currentBet.getMember().getName().equals(event.getWinner()) && currentBet.getResult().equals(event.getScore())) {currentBet.setBetResult(true); }
                        else { currentBet.setBetResult(false); }
                    }
                }
                betRepository.save(currentBet);
            }
            this.callPrizes(event.getId());
        }
    }

    private void callPrizes(Long idEvent){
        double bonusPrize;
        double withoutBonusPrize;
        double sumPrize[] = sumPrize(idEvent);
        if(sumPrize[0]>0.0) {
            if(sumPrize[1]>0) {
                Bet generalBet[] = betRepository.getAllIsGeneral(idEvent);
                Bet notGeneralBet[] = betRepository.getAllIsNotGeneral(idEvent);
                if(sumPrize[2]>0.0) {
                    if(sumPrize[1]-sumPrize[2]>0.0) {
                        withoutBonusPrize = (sumPrize[0] - sumPrize[1]) * 0.3;
                        bonusPrize = (sumPrize[0] - sumPrize[1]) * 0.7;
                    }
                    else{
                        withoutBonusPrize = 0.0;
                        bonusPrize = (sumPrize[0] - sumPrize[1]);
                    }
                }
                else{
                    withoutBonusPrize = (sumPrize[0] - sumPrize[1]);
                    bonusPrize = 0.0;
                }
                for (Bet bet : generalBet) {
                    bet.setPrize(
                            bet.getAmount() + (float) (withoutBonusPrize * bet.getAmount() / (sumPrize[1] - sumPrize[2]))
                    );
                    betRepository.saveAndFlush(bet);
                }

                for (Bet bet : notGeneralBet) {
                    bet.setPrize(
                            bet.getAmount() + (float) (bonusPrize * bet.getAmount() / sumPrize[2])
                    );
                    betRepository.saveAndFlush(bet);
                }
            }
            else{
                Bet allEventBet[] = betRepository.getAllByEvent(idEvent);
                for (Bet bet : allEventBet) {
                    bet.setPrize(
                            bet.getAmount()
                    );
                    betRepository.saveAndFlush(bet);
                }
            }
        }
    }

    private double[] sumPrize(Long idEvent){
        double prize[] = new double[3];
        prize[0]=0.0;
        prize[1]=0.0;
        prize[2]=0.0;
        if(betRepository.getAllByEvent(idEvent).length != 0)
        {
            Bet sum[] = betRepository.allPrize(idEvent);
            for (Bet bet:sum) {
                prize[0]= prize[0] + bet.getAmount();
                if(bet.getBetResult()==true) {
                    prize[1]= prize[1] + bet.getAmount();
                    if(bet.getGeneral()==false)
                        prize[2]= prize[2] + bet.getAmount();
                }
            }
        }

        return prize;
    }

    public Bet[] getAllBetsByEventId(Long eventId) {

        return betRepository.getAllByEvent(eventId);
    }

}

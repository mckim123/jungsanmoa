package com.example.jungsan.transferplanner;

import com.example.jungsan.dto.Transfer;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class SacrificialTransferPlanner implements TransferPlanner {
    @Override
    public List<Transfer> plan(Map<String, Integer> roundedRemainings) {
        List<Transfer> transfers = new ArrayList<>();

        if (roundedRemainings.isEmpty()) {
            return transfers;
        }
        Set<String> names = roundedRemainings.keySet();
        String sacrifice = names.stream().skip((int) (names.size() * Math.random())).findFirst().get();

        if (roundedRemainings.values().stream().filter(value -> value > 0).count() == 1) {
            sacrifice = roundedRemainings.entrySet().stream().filter(x -> x.getValue() > 0).findFirst().get().getKey();
        }
        if (roundedRemainings.values().stream().filter(value -> value < 0).count() == 1) {
            sacrifice = roundedRemainings.entrySet().stream().filter(x -> x.getValue() < 0).findFirst().get().getKey();
        }
        for (String name : names) {
            int remaining = roundedRemainings.get(name);
            if (sacrifice.equals(name)) {
                continue;
            }
            if (remaining > 0) {
                transfers.add(new Transfer(name, sacrifice, remaining));
            } else {
                transfers.add(new Transfer(sacrifice, name, -remaining));
            }
        }
        return transfers;
    }
}

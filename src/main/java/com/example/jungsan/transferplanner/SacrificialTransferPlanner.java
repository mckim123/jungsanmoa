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

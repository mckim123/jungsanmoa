package com.example.jungsan.config;

import com.example.jungsan.transferplanner.SacrificialTransferPlanner;
import com.example.jungsan.transferplanner.TransferPlanner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig implements WebMvcConfigurer {
    @Bean
    public TransferPlanner transferPlanner() {
        return new SacrificialTransferPlanner();
    }
}

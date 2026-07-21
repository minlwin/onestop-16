package com.jdc.foods.utils.mails;

import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmployeeCreatedEventListner {
	
	private final JavaMailSender mailSender;

	@Async
	@EventListener
	void handle(EmployeeCreatedEvent event) throws MessagingException {
		var message = mailSender.createMimeMessage();
		
		var helper = new MimeMessageHelper(message);
		helper.setFrom("invoice@foodorder.com");
		helper.setTo(event.email());
		helper.setSubject("Employee Creation Notification");
		
		helper.setText("""
				<h1>Welcome to Food Ordering System</h1>
				
				<ul>
					<li>Name : %s</li>
					<li>Password : %s</li>
					<li>Entry Date : %s</li>
				</ul>
				""".formatted(event.name(), event.password(), event.entryAt()), true);
		
		mailSender.send(message);
	}
}

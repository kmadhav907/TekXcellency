package com.tekrewards.application.main.services;

import com.tekrewards.application.main.pojo.MailObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    public void sendWelcomeMail(MailObject mail) throws MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED, StandardCharsets.UTF_8.name());
        Context context = new Context();
        context.setVariables(mail.getProperties());
        String template = mail.getTemplateName();
        String html = templateEngine.process(template, context);
        mimeMessageHelper.setTo(mail.getTo());
        mimeMessageHelper.setText(html, true);
        mimeMessageHelper.setSubject(mail.getSubject());
        mimeMessageHelper.setFrom(mail.getFrom());
        javaMailSender.send(mimeMessage);



    }
    public void sendForgotPasswordMail(MailObject mailObject) throws MessagingException {
MimeMessage mimeMessage = javaMailSender.createMimeMessage();
MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED, StandardCharsets.UTF_8.name());
Context context = new Context();
context.setVariables(mailObject.getProperties());
String html = templateEngine.process(mailObject.getTemplateName(), context);
mimeMessageHelper.setText(html, true);
mimeMessageHelper.setTo(mailObject.getTo());
mimeMessageHelper.setSubject(mailObject.getSubject());
mimeMessageHelper.setFrom(mailObject.getFrom());
javaMailSender.send(mimeMessage);
    }
    public void sendVoteNotificationMail(MailObject mailObject) throws  MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED, StandardCharsets.UTF_8.name());
        Context context = new Context();
        context.setVariables(mailObject.getProperties());
        String html = templateEngine.process(mailObject.getTemplateName(), context);
        mimeMessageHelper.setText(html, true);
        mimeMessageHelper.setTo(mailObject.getTo());
        mimeMessageHelper.setFrom(mailObject.getFrom());
        mimeMessageHelper.setSubject(mailObject.getSubject());

        javaMailSender.send(mimeMessage);
    }

}

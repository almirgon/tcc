package com.example.promotion.security;

import com.example.promotion.dto.JWTokenDTO;
import com.example.promotion.dto.TokenDTO;
import com.example.promotion.dto.UserDTO;
import com.example.promotion.exceptions.user.UserNullException;
import com.example.promotion.models.User;
import com.example.promotion.services.user.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.stream.Collectors;
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Autowired
    private UserService userService;
    @Autowired
    private JWTTokenServiceBean jwtTokenServiceBean;

    private final AuthenticationManager authenticationManager;
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, ApplicationContext ctx) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenServiceBean = ctx.getBean(JWTTokenServiceBean.class);
        this.userService = ctx.getBean(UserService.class);
        setFilterProcessesUrl(SecurityConstants.AUTH_LOGIN_URL);
    }



    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) {
        String username = "";
        String password = "";
        try {
            ObjectMapper mapper = new ObjectMapper();
            User user = mapper.readValue(request.getInputStream(), User.class);
            username = user.getEmail();
            password = user.getPassword();
        }  catch (Exception e) {
            try {
                unsuccessfulAuthentication(request, response, (AuthenticationException) e);
            } catch (IOException ioException) {
                ioException.printStackTrace();
            } catch (ServletException servletException) {
                servletException.printStackTrace();
            }
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        HashMap<String, String> myResponse = new HashMap<>();
        myResponse.put("message", failed.getMessage());
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(myResponse);
        response.setContentType("application/json");
        response.setStatus(400);
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain filterChain, Authentication authentication) {
        String user = (String) authentication.getPrincipal();

        byte[] signingKey = SecurityConstants.JWT_SECRET.getBytes();

        String token = Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(signingKey), SignatureAlgorithm.HS512)
                .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)
                .setIssuer(SecurityConstants.TOKEN_ISSUER)
                .setAudience(SecurityConstants.TOKEN_AUDIENCE)
                .setSubject(user)
                .setExpiration(new Date(System.currentTimeMillis() + 43200000))
                .compact();


        response.addHeader(SecurityConstants.TOKEN_HEADER, SecurityConstants.TOKEN_PREFIX + token);
        try {
            String userEmail = this.jwtTokenServiceBean.getUserEmailFromJWTToken(token);
            User myUser = this.userService.findUser(userEmail);
            UserDTO userDTO = new UserDTO(myUser);
            JWTokenDTO jwTokenDTO = new JWTokenDTO(token, userDTO);
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(jwTokenDTO);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } catch (Exception e){
            throw new UserNullException("Usuario não encontrado");

        }
    }


}

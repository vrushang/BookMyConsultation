package com.upgrad.bookmyconsultation.service;

import com.upgrad.bookmyconsultation.entity.Doctor;
import com.upgrad.bookmyconsultation.entity.Rating;
import com.upgrad.bookmyconsultation.repository.DoctorRepository;
import com.upgrad.bookmyconsultation.repository.RatingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class RatingsService {

	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private RatingsRepository ratingsRepository;

	@Autowired
	private DoctorRepository doctorRepository;

	
	//create a method name submitRatings with void return type and parameter of type Rating
		//set a UUID for the rating
		//save the rating to the database
		//get the doctor id from the rating object
		//find that specific doctor with the using doctor id
		//modify the average rating for that specific doctor by including the new rating
		//save the doctor object to the database
	
	public  void submitRatings(Rating rating){
		rating.setId(UUID.randomUUID().toString());
		ratingsRepository.save(rating);

		String doctorId=rating.getDoctorId();
		Doctor getDoctor = doctorRepository.findById(doctorId).get();
		List<Rating> ListOfRating= ratingsRepository.findByDoctorId(doctorId);
		Integer sum = 0;
		Iterator<Rating> it = ListOfRating.iterator();
		while(it.hasNext()) {
			sum += it.next().getRating();
		}
		Integer size = ListOfRating.size() + 1;
		sum += rating.getRating();
		double avg = sum / size;
		getDoctor.setRating(avg);

		//save the doctor object to the database
		doctorRepository.save(getDoctor);

	}

	}


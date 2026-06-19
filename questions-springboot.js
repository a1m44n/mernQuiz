/* Java Spring Boot Rapid Fire - Question Bank
   Add, remove, or edit questions here.
   Each question needs: id, type, stage, question, reference
*/

const questions = [

   // STAGE 1: APPLICATION SETUP
    {
        id: 1,
        type: "snippet",
        stage: "Stage 1: App Setup",
        question: "Write the single annotation that marks the main class as a Spring Boot application.",
        reference: "@SpringBootApplication"
    },
    {
        id: 2,
        type: "snippet",
        stage: "Stage 1: App Setup",
        question: "Write the line inside main() that bootstraps and starts the Spring Boot app (class is MoviesApplication).",
        reference: "SpringApplication.run(MoviesApplication.class, args);"
    },
    {
        id: 3,
        type: "snippet",
        stage: "Stage 1: App Setup",
        question: "Write the package declaration line used in this project.",
        reference: "package aiman.dev.movies;"
    },
 
    // STAGE 2: DATA MODELS
    {
        id: 4,
        type: "snippet",
        stage: "Stage 2: Data Models",
        question: "Write the annotation that maps a class to a MongoDB collection named 'movies'.",
        reference: `@Document(collection = "movies")`
    },
    {
        id: 5,
        type: "snippet",
        stage: "Stage 2: Data Models",
        question: "Write the annotation used to mark the primary key field in a MongoDB document class.",
        reference: "@Id"
    },
    {
        id: 6,
        type: "snippet",
        stage: "Stage 2: Data Models",
        question: "Write all three Lombok annotations stacked together that generate getters/setters, all-args constructor, and no-args constructor.",
        reference: "@Data\n@AllArgsConstructor\n@NoArgsConstructor"
    },
    {
        id: 7,
        type: "snippet",
        stage: "Stage 2: Data Models",
        question: "In Movie.java, write the annotation placed above the reviewIds field that creates a reference to documents in the Review collection.",
        reference: "@DocumentReference"
    },
    {
        id: 8,
        type: "snippet",
        stage: "Stage 2: Data Models",
        question: "Write the field declaration for the primary key in Movie.java using the correct type for MongoDB ObjectIds.",
        reference: "private ObjectId id;"
    },
    {
        id: 9,
        type: "snippet",
        stage: "Stage 2: Data Models",
        question: "In Review.java, write the custom constructor that only accepts a 'body' String and assigns it.",
        reference: "public Review(String body) {\n    this.body = body;\n}"
    },
    {
        id: 10,
        type: "snippet",
        stage: "Stage 2: Data Models",
        question: "Write the field declaration for a list of genres in Movie.java (using the correct Java generic type).",
        reference: "private List<String> genres;"
    },
 
    // STAGE 3: REPOSITORY LAYER
    {
        id: 11,
        type: "snippet",
        stage: "Stage 3: Repository",
        question: "Write the annotation that marks an interface as a Spring Data repository component.",
        reference: "@Repository"
    },
    {
        id: 12,
        type: "snippet",
        stage: "Stage 3: Repository",
        question: "Write the full interface declaration line for MovieRepository, extending the correct Spring Data MongoDB base interface with the right generics.",
        reference: "public interface MovieRepository extends MongoRepository<Movie, ObjectId> {"
    },
    {
        id: 13,
        type: "snippet",
        stage: "Stage 3: Repository",
        question: "Write the derived query method signature in MovieRepository that finds a Movie by its imdbId.",
        reference: "Optional<Movie> findMovieByImdbId(String imdbId);"
    },
    {
        id: 14,
        type: "snippet",
        stage: "Stage 3: Repository",
        question: "ReviewRepository has no custom methods — write its full interface declaration (one line) showing how it extends MongoRepository.",
        reference: "public interface ReviewRepository extends MongoRepository<Review, ObjectId> {"
    },
 
    // STAGE 4: SERVICE LAYER
    {
        id: 15,
        type: "snippet",
        stage: "Stage 4: Service",
        question: "Write the annotation that marks a class as a Spring service component.",
        reference: "@Service"
    },
    {
        id: 16,
        type: "snippet",
        stage: "Stage 4: Service",
        question: "Write the annotation used to inject a dependency automatically in Spring.",
        reference: "@Autowired"
    },
    {
        id: 17,
        type: "snippet",
        stage: "Stage 4: Service",
        question: "In MovieService, write the complete one-line method body for allMovies() that retrieves all movies.",
        reference: "return movieRepository.findAll();"
    },
    {
        id: 18,
        type: "snippet",
        stage: "Stage 4: Service",
        question: "In MovieService, write the one-line method body for singleMovie() that finds a movie by its imdbId.",
        reference: "return movieRepository.findMovieByImdbId(imdbId);"
    },
    {
        id: 19,
        type: "snippet",
        stage: "Stage 4: Service",
        question: "In ReviewService, write the line that inserts a new Review (constructed with reviewBody) into the repository and saves the result.",
        reference: "Review review = reviewRepository.insert(new Review(reviewBody));"
    },
    {
        id: 20,
        type: "snippet",
        stage: "Stage 4: Service",
        question: "Write the field declaration for MongoTemplate inside ReviewService.",
        reference: "private MongoTemplate mongoTemplate;"
    },
    {
        id: 21,
        type: "snippet",
        stage: "Stage 4: Service",
        question: "Write the full MongoTemplate chain used in ReviewService to find a Movie by imdbId and push a review into its reviewIds array.",
        reference: `mongoTemplate.update(Movie.class)\n        .matching(Criteria.where("imdbId").is(imdbId))\n        .apply(new Update().push("reviewIds").value(review))\n        .first();`
    },
 
    // STAGE 5: CONTROLLER LAYER
    {
        id: 22,
        type: "snippet",
        stage: "Stage 5: Controller",
        question: "Write the annotation that marks a class as a Spring REST controller (combining @Controller and @ResponseBody).",
        reference: "@RestController"
    },
    {
        id: 23,
        type: "snippet",
        stage: "Stage 5: Controller",
        question: "Write the annotation that maps the base URL path '/api/v1/movies' to MovieController.",
        reference: `@RequestMapping("/api/v1/movies")`
    },
    {
        id: 24,
        type: "snippet",
        stage: "Stage 5: Controller",
        question: "Write the annotation for a controller method that handles GET requests to the root path '/'.",
        reference: "@GetMapping"
    },
    {
        id: 25,
        type: "snippet",
        stage: "Stage 5: Controller",
        question: "Write the @GetMapping annotation and method signature for getSingleMovie, including the @PathVariable parameter.",
        reference: `@GetMapping("/{imdbId}")\npublic ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String imdbId) {`
    },
    {
        id: 26,
        type: "snippet",
        stage: "Stage 5: Controller",
        question: "Write the return statement inside getAllMovies() that wraps the result with HTTP 200 status.",
        reference: "return new ResponseEntity<List<Movie>>(movieService.allMovies(), HttpStatus.OK);"
    },
    {
        id: 27,
        type: "snippet",
        stage: "Stage 5: Controller",
        question: "Write the annotation for a controller method that handles POST requests.",
        reference: "@PostMapping"
    },
    {
        id: 28,
        type: "snippet",
        stage: "Stage 5: Controller",
        question: "Write the parameter declaration in createReview() that reads a JSON request body as a Map of strings.",
        reference: "@RequestBody Map<String, String> payload"
    },
    {
        id: 29,
        type: "snippet",
        stage: "Stage 5: Controller",
        question: "Write the return statement in createReview() that returns the saved Review with HTTP 201 (Created) status, extracting 'reviewBody' and 'imdbId' from the payload.",
        reference: `return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody"), payload.get("imdbId")), HttpStatus.CREATED);`
    },
    {
        id: 30,
        type: "snippet",
        stage: "Stage 5: Controller",
        question: "What HttpStatus constant represents a '201 Created' response in Spring?",
        reference: "HttpStatus.CREATED"
    },
 
    // FUNDAMENTALS: CONCEPTUAL / ARCHITECTURE
    {
        id: 31,
        type: "snippet",
        stage: "Fundamentals: Architecture",
        question: "Name the three layers of the Spring Boot architecture used in this project, from the layer closest to the database up to the layer that handles HTTP requests.",
        reference: "Repository → Service → Controller"
    },
    {
        id: 32,
        type: "snippet",
        stage: "Fundamentals: Architecture",
        question: "Which single annotation on the main class tells Spring to auto-scan and register all @Service, @Repository, and @RestController components at startup?",
        reference: "@SpringBootApplication"
    },
    {
        id: 33,
        type: "snippet",
        stage: "Fundamentals: Architecture",
        question: "In plain terms, what is dependency injection — why do we use @Autowired instead of calling 'new MovieService()' manually inside MovieController?",
        reference: "Spring creates and manages the object for you. Using new would tightly couple classes and bypass Spring's lifecycle management (singleton scope, proxying, etc)."
    },
    {
        id: 34,
        type: "snippet",
        stage: "Fundamentals: Architecture",
        question: "Which file in this project is the equivalent of Express's 'app.js' or 'server.js' entry point — the file Spring Boot runs first?",
        reference: "MoviesApplication.java"
    },
 
    // FUNDAMENTALS: JAVA SYNTAX
    {
        id: 35,
        type: "snippet",
        stage: "Fundamentals: Java Syntax",
        question: "What access modifier keyword makes a field only accessible within its own class?",
        reference: "private"
    },
    {
        id: 36,
        type: "snippet",
        stage: "Fundamentals: Java Syntax",
        question: "Write the correct import statement to bring the List type into scope in a Java file.",
        reference: "import java.util.List;"
    },
    {
        id: 37,
        type: "snippet",
        stage: "Fundamentals: Java Syntax",
        question: "Why does singleMovie() return Optional<Movie> instead of just Movie? What problem does Optional solve?",
        reference: "Optional wraps a value that might be null. It forces the caller to handle the 'not found' case explicitly instead of risking a NullPointerException."
    },
    {
        id: 38,
        type: "snippet",
        stage: "Fundamentals: Java Syntax",
        question: "In Java, what is the key difference between an interface and a class — can you instantiate an interface directly?",
        reference: "An interface only defines method signatures (a contract), not implementations. You cannot instantiate it directly — a class must implement it."
    },
    {
        id: 39,
        type: "snippet",
        stage: "Fundamentals: Java Syntax",
        question: "Write the return type keyword used in a Java method that does not return any value.",
        reference: "void"
    },
    {
        id: 40,
        type: "snippet",
        stage: "Fundamentals: Java Syntax",
        question: "What keyword makes a Java variable unable to be reassigned after it is first set — similar to 'const' in JavaScript?",
        reference: "final"
    },
    {
        id: 41,
        type: "snippet",
        stage: "Fundamentals: Java Syntax",
        question: "Write the correct way to compare two String variables s1 and s2 for equality in Java (using == is wrong — why, and what do you use instead)?",
        reference: "s1.equals(s2) — because == checks reference identity (are they the same object in memory), not value equality."
    },
    {
        id: 42,
        type: "snippet",
        stage: "Fundamentals: Java Syntax",
        question: "Write the access modifier that makes a class or method visible and usable from any other class in any package.",
        reference: "public"
    },
 
    // FUNDAMENTALS: SPRING / LOMBOK CONCEPTS
    {
        id: 43,
        type: "snippet",
        stage: "Fundamentals: Spring & Lombok",
        question: "What does the Lombok @Data annotation generate for you? List what it replaces.",
        reference: "@Data generates getters and setters for all fields, equals(), hashCode(), and toString() — replacing all of that boilerplate manually."
    },
    {
        id: 44,
        type: "snippet",
        stage: "Fundamentals: Spring & Lombok",
        question: "Why does Movie.java need @NoArgsConstructor alongside @AllArgsConstructor — what breaks if the no-args constructor is missing?",
        reference: "MongoDB (and JPA) need a no-args constructor to instantiate the object via reflection when deserializing documents from the database. Without it, reading from MongoDB will throw an error."
    },
    {
        id: 45,
        type: "snippet",
        stage: "Fundamentals: Spring & Lombok",
        question: "Why does ReviewService use MongoTemplate instead of ReviewRepository to push a review into Movie's reviewIds — what can MongoTemplate do that the repository interface cannot?",
        reference: "MongoTemplate supports complex update operations like $push on a different collection. Repository interfaces only provide simple CRUD and derived queries on their own entity."
    },
 
    // FUNDAMENTALS: HTTP & REST
    {
        id: 46,
        type: "snippet",
        stage: "Fundamentals: HTTP & REST",
        question: "What numeric HTTP status codes do HttpStatus.OK and HttpStatus.CREATED represent, and when should you use each?",
        reference: "OK = 200 (request succeeded, returning data). CREATED = 201 (a new resource was successfully created)."
    },
    {
        id: 47,
        type: "snippet",
        stage: "Fundamentals: HTTP & REST",
        question: "What is the difference between @PathVariable and @RequestBody — give an example of when you would use each?",
        reference: "@PathVariable reads a value from the URL path (e.g. /movies/{imdbId}). @RequestBody reads data from the JSON body of the request (e.g. a POST payload). Use PathVariable for identifiers in the URL, RequestBody for structured data sent with the request."
    },
    {
        id: 48,
        type: "snippet",
        stage: "Fundamentals: HTTP & REST",
        question: "What does wrapping a return value in ResponseEntity give you that returning the object directly (e.g. just 'Movie') does not?",
        reference: "ResponseEntity lets you control the HTTP status code, headers, and body explicitly. Returning a plain object always gives a 200 OK with no control over headers or status."
    },


];

module.exports = questions;
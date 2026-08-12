export interface ExerciseInfo {
  short: string;
  long?: string;
  image?: string;
  youtubeId?: string;
}

export const exerciseInfo: Record<string, ExerciseInfo> = {
  "Cat-Cow": {
    short: "A gentle spinal mobility flow alternating between arching and rounding the back to warm up the spine and relieve tension.",
    long: "Start on all fours with wrists under shoulders and knees under hips. Inhale as you drop your belly and lift your chest (Cow), then exhale as you round your spine and tuck your chin (Cat). Move slowly and breathe deeply, syncing each movement with your breath. This flow warms up the entire spine, improves mobility between vertebrae, and relieves tension in the back and neck. Perform 5-8 slow repetitions as part of your warm-up.",
  },
  "Wrist Prep": {
    short: "Wrist extension and flexion drills that prepare the joints and tendons for pushing and supporting exercises.",
    long: "Wrist preparation is critical for any pushing or support work. Start by kneeling and placing your hands flat on the floor with fingers forward, gently shifting weight over the wrists to stretch the flexors. Then reverse the hands (fingers back) to stretch the extensors. Follow with wrist circles in both directions. Spend 30 seconds on each position. This builds the tendon strength and joint mobility needed for push-ups, dips, and planche work while preventing impingement.",
  },
  "Feet-Elevated Push-ups": {
    short: "Push-ups with feet raised on a surface to increase the load on the upper chest and shoulders, building pressing strength.",
    long: "Elevate your feet on a bench, chair, or wall — the higher the elevation, the more the load shifts toward the shoulders and upper chest. Lower your chest to the floor with control, keeping a straight body line and elbows at about 45 degrees. Press back up powerfully. This progression bridges the gap between standard push-ups and pike push-ups or handstand push-ups. Stop 1-2 reps before failure to preserve form.",
  },
  "Pike Push-ups": {
    short: "A vertical pressing movement performed in a pike position, targeting the shoulders and upper chest as a precursor to handstand push-ups.",
    long: "Start in a downward dog position with hips high and hands shoulder-width apart. Bend your elbows to lower the crown of your head toward the floor between your hands, then press back up. Keep your arms straight and walk your feet in closer to increase the vertical load on the shoulders. This exercise builds the pressing strength and shoulder mobility needed for handstand push-ups. Control the descent — do not dive bomb.",
  },
  "Dips": {
    short: "An upper-body compound exercise using parallel bars that targets the triceps, chest, and front deltoids through a deep pressing range of motion.",
    long: "Support yourself on parallel bars with arms locked and shoulders depressed. Lean forward slightly to bias the chest, or stay upright to target the triceps. Lower yourself until your shoulders dip below your elbows, then press back up to full lockout. Keep the core tight and avoid swinging. Dips are one of the best bodyweight exercises for building pressing strength and can be weighted for additional challenge.",
  },
  "Hollow Body Hold": {
    short: "A gymnastic core exercise where you press your lower back into the floor while lifting the arms and legs, building deep abdominal strength.",
    long: "Lie on your back and lift your arms overhead and legs straight off the floor. Press your lower back firmly into the ground — if it arches, raise your legs higher. The goal is to create a shallow 'banana' shape with your body, with the abs fully engaged. Hold for 20-45 seconds. This is the foundational core position in gymnastics and protects the spine during all skills. Breathe steadily throughout.",
  },
  "Ab Roller": {
    short: "A core exercise using a wheel to roll forward from a kneeling position, training anti-extension stability through the abs and lower back.",
    long: "Kneel on a pad with the ab roller in front of you. Keep your arms straight, ribs down, and glutes tight. Roll forward slowly, extending your body as far as you can control without letting your lower back arch. Then roll back using your core, not your arms. The further you extend, the harder it becomes. Start with small ranges and progress. This is one of the most effective exercises for anti-extension core strength.",
  },
  "Hip Flexor Stretch": {
    short: "A kneeling or standing stretch that opens the front of the hip, improving hip extension and counteracting prolonged sitting.",
    long: "Kneel in a lunge position with the front knee at 90 degrees. Tuck your tailbone under and squeeze the glute of the back leg to drive the hip forward. You should feel a stretch in the front of the hip and thigh of the back leg. Reach overhead with the same-side arm to deepen the stretch. Hold for 30-45 seconds per side. This stretch is essential for counteracting the hip flexor shortening caused by sitting.",
  },
  "Seated Pike": {
    short: "A seated forward fold with legs together that stretches the hamstrings and builds the compression strength needed for L-sit progressions.",
    long: "Sit on the floor with legs straight and together. Reach your arms forward and fold from the hips, keeping the spine long. If your hamstrings are tight, bend the knees slightly. The goal is not just passive stretching but active compression — think about pulling your chest toward your thighs using your hip flexors and abs. Hold for 30 seconds. This builds the active flexibility needed for L-sit and compression work.",
  },
  "Pull-ups": {
    short: "A vertical pulling exercise hanging from a bar, targeting the lats, biceps, and upper back through a full range of motion.",
    long: "Hang from a pull-up bar with an overhand grip, hands slightly wider than shoulder-width. Pull your chest toward the bar by driving your elbows down and back. Squeeze at the top, then lower with control to a full dead hang. Avoid kipping or swinging. If you cannot do full pull-ups, use a resistance band for assistance or do negatives (jump up, lower slowly). Pull-ups are the gold standard for upper-body pulling strength.",
  },
  "Chin-ups": {
    short: "A pulling exercise with an underhand grip that emphasizes the biceps and lats, building upper-body pulling strength.",
    long: "Hang from a bar with an underhand (supinated) grip at shoulder-width. Pull your chest to the bar, focusing on driving the elbows down. The underhand grip increases bicep activation compared to pull-ups. Lower slowly to a full hang. Chin-ups are slightly easier than pull-ups for most people and are excellent for building both pulling strength and arm development.",
  },
  "Bodyweight Rows": {
    short: "A horizontal pulling exercise using a low bar or rings, targeting the upper back, rhomboids, and biceps for balanced shoulder development.",
    long: "Set a bar or rings at about waist height. Hang underneath with your body in a straight line, chest up. Pull your chest toward the bar by squeezing your shoulder blades together and bending the elbows. Lower with control. The more horizontal your body, the harder the exercise. Bodyweight rows complement push-ups perfectly by developing the pulling muscles that push-ups neglect.",
  },
  "DB Hammer Curls": {
    short: "A bicep and forearm exercise using a neutral grip with dumbbells, building arm strength and elbow stability.",
    long: "Stand with a dumbbell in each hand, palms facing each other (neutral grip). Curl the weights up while keeping the elbows pinned to your sides. Squeeze at the top, then lower with control. The neutral grip engages the brachialis and brachioradialis in addition to the biceps, making this excellent for overall arm development and elbow joint stability. No swinging — keep it strict.",
  },
  "Plank": {
    short: "An isometric core exercise holding a push-up position on the forearms, building endurance through the abs, obliques, and lower back.",
    long: "Rest on your forearms with elbows under your shoulders, body in a straight line from head to heels. Brace your abs, squeeze your glutes, and keep your neck neutral. Do not let your hips sag or pike up. Hold for 45-90 seconds, breathing steadily. The plank builds isometric core endurance that translates to better performance in every other exercise and protects the lower back.",
  },
  "Air Squats": {
    short: "Bodyweight squats performed with full depth and control, building leg strength and mobility without external load.",
    long: "Stand with feet shoulder-width apart, toes slightly turned out. Sit back and down, keeping your chest up and knees tracking over your toes. Go as deep as your mobility allows — ideally below parallel. Drive through your heels to stand back up, squeezing the glutes at the top. Keep the tempo controlled: 2-3 seconds down, 1 second up. Air squats build the foundation of leg strength and hip mobility.",
  },
  "Split Squats": {
    short: "A single-leg squat variation with one foot forward and one back, developing leg strength, balance, and hip stability.",
    long: "Step into a staggered stance with one foot forward and one back. Lower straight down by bending both knees to 90 degrees, keeping your torso upright and front knee tracking over the toes. Push through the front heel to stand back up. Keep most of the weight on the front leg. Split squats build single-leg strength and address imbalances between sides. Progress to Bulgarian split squats by elevating the rear foot.",
  },
  "DB Romanian Deadlift": {
    short: "A hip-hinge exercise targeting the hamstrings and glutes, performed with a slight knee bend and a controlled negative.",
    long: "Hold dumbbells in front of your thighs. Hinge at the hips with a slight knee bend, pushing your hips back and lowering the weights along your legs. Keep your back flat and feel a stretch in your hamstrings. Stop when you feel tension, then drive your hips forward to stand. Do not squat — this is a hinge. The RDL builds hamstring and glute strength with less lower-back stress than conventional deadlifts.",
  },
  "Glute Bridge": {
    short: "A hip extension exercise lying on the back, squeezing the glutes to lift the hips and strengthening the posterior chain.",
    long: "Lie on your back with knees bent and feet flat. Squeeze your glutes and lift your hips until your body forms a straight line from knees to shoulders. Hold for a second at the top, then lower with control. Focus on glute activation, not lower back extension. To progress, do single-leg glute bridges. This exercise strengthens the glutes and improves hip extension, which is key for athletic performance.",
  },
  "Easy Walk": {
    short: "A low-intensity walk for active recovery, promoting blood flow and reducing muscle soreness without added fatigue.",
    long: "Walk at a comfortable, conversational pace for 10-30 minutes. The goal is gentle movement that increases blood flow to aid recovery without adding training stress. Easy walks are perfect for rest days or after intense training sessions. Keep it relaxed — this is not a power walk or hike. The fresh air and movement help reduce stiffness and promote mental recovery as well.",
  },
  "World's Greatest Stretch": {
    short: "A multi-plane mobility drill combining a lunge, thoracic rotation, and hamstring stretch to open the hips and upper back.",
    long: "Step into a deep lunge with your front foot, then place the opposite hand on the floor inside the front foot. Rotate the same-side arm up toward the ceiling, opening the chest and thoracic spine. Return to center and straighten the front leg to stretch the hamstring. This flow hits multiple muscle groups in all three planes of motion, making it one of the most efficient warm-up stretches you can do.",
  },
  "Pancake Stretch": {
    short: "A seated straddle forward fold that stretches the adductors and hamstrings while building hip compression for gymnastic skills.",
    long: "Sit on the floor with your legs spread wide in a straddle position. Keep your knees pointing up (not rolling inward). Fold forward from the hips with a straight spine, reaching your hands far forward. The goal is to eventually bring your chest to the floor. This stretch opens the adductors and hamstrings while building the active hip compression needed for gymnastic skills like press handstands and L-sits.",
  },
  "DB Lateral Raises": {
    short: "A shoulder isolation exercise lifting dumbbells out to the sides, targeting the lateral deltoid for shoulder width.",
    long: "Stand with dumbbells at your sides, palms facing in. Raise the weights out to the sides until your arms are parallel to the floor, keeping a slight bend in the elbows. Lead with the elbows, not the hands. Lower slowly. Do not swing or use momentum — strict form maximizes lateral deltoid activation. This exercise builds shoulder width and complements overhead pressing.",
  },
  "Support Hold (Dip Bars)": {
    short: "A static hold on dip bars with locked elbows and depressed shoulders, building straight-arm strength foundational to gymnastics.",
    long: "Support yourself on dip bars with arms fully locked. Push your shoulders down away from your ears (depression) and lock the elbows completely. Engage the core and hold a straight body line. This static hold builds the straight-arm strength and shoulder stability that underpins all gymnastic skills. Start with 20-second holds and progress to 40+ seconds. Never let the shoulders shrug up to the ears.",
  },
  "Tuck L-Sit": {
    short: "A gymnastic core hold supporting the body on the hands with tucked knees, building compression and straight-arm pressing strength.",
    long: "Sit on the floor or parallettes with hands beside your hips. Press down hard through your hands and lift your hips and tucked knees off the ground. Keep your arms straight and shoulders depressed. The tighter the tuck, the easier it is — as you progress, extend one leg at a time. Hold for 10-20 seconds. This builds the core compression and straight-arm strength needed for the full L-sit.",
  },
  "Compression Raises": {
    short: "A seated exercise lifting straight legs toward the torso, building active hip flexor and abdominal compression strength.",
    long: "Sit on the floor with legs straight in front. Place your hands beside your hips and lean back slightly. Lift both straight legs up toward your torso using your hip flexors and abs, then lower with control. Do not let the lower back round excessively. This exercise builds the active compression strength that is essential for L-sit progressions and press handstands. Aim for 6-12 controlled reps.",
  },
  "Shoulder Dislocates (band)": {
    short: "A shoulder mobility drill passing a resistance band overhead and behind the back, improving shoulder range of motion.",
    long: "Hold a resistance band with a wide grip in front of you. Keeping your arms straight, sweep the band overhead and behind your back, then reverse the movement. Narrow your grip as your mobility improves. This drill opens the shoulder joint through its full range of motion and improves overhead mobility. Perform 10 reps as part of your warm-up or recovery. Never force through pain.",
  },
  "Swimmer Shoulder Press": {
    short: "An overhead pressing exercise with dumbbells focused on muscular endurance in the shoulders, mimicking the paddle motion.",
    long: "Perform a standard dumbbell shoulder press with moderate weight and higher reps (8-12). Focus on a full range of motion and controlled tempo. The goal is muscular endurance in the shoulders and upper back to support the repetitive paddling motion in surfing. Keep the core braced and avoid arching the lower back. This builds the stamina needed for long surf sessions.",
  },
  "Prone Snow Angels": {
    short: "A shoulder and upper-back exercise performed face-down, sweeping the arms in an arc to strengthen the rotator cuff and postural muscles.",
    long: "Lie face-down on the floor with arms extended overhead, palms down. Sweep your arms out to the sides and down to your hips, then reverse back overhead — like making a snow angel. Keep the arms lifted off the floor throughout. This strengthens the rotator cuff, rhomboids, and lower traps, improving posture and shoulder health. Perform 12-15 controlled reps.",
  },
  "Side Plank Rotations": {
    short: "A dynamic side plank variation threading the top arm under the body, building rotational core power for surf turns.",
    long: "Start in a side plank position with the top arm reaching up. Rotate your torso and thread the top arm under your body, then rotate back up. This dynamic rotation builds the oblique power and rotational control needed for carving turns on a surfboard. Keep the hips elevated throughout. Perform 8 reps per side.",
  },
  "Russian Twists": {
    short: "A seated rotational exercise twisting the torso side to side, targeting the obliques and rotational core power.",
    long: "Sit on the floor with knees bent and feet lifted (or heels on the floor for an easier version). Lean back slightly to engage the core. Twist your torso from side to side, touching the floor beside your hips with each rotation. Hold a weight for added resistance. This builds rotational core strength that translates to surf turns, golf swings, and any sport requiring trunk rotation.",
  },
  "Explosive Push-ups": {
    short: "Push-ups performed with maximum speed to develop upper-body power and the fast-twitch activation needed for surf pop-ups.",
    long: "Perform a standard push-up but press up as explosively as possible, trying to generate maximum speed. Your hands may leave the floor briefly (clap push-up progression). Lower with control. The goal is speed, not max reps — do 6-10 quality reps. This develops the fast-twitch power in the chest and shoulders that mimics the explosive pop-up motion in surfing.",
  },
  "Jump Squats": {
    short: "A plyometric exercise squatting then exploding upward into a jump, building leg power and explosive strength.",
    long: "Perform a bodyweight squat, then explode upward into a maximum-height jump. Land softly with bent knees to absorb the impact, then immediately descend into the next rep. Use your arms to generate momentum. Jump squats build explosive leg power and rate of force development, which translates to surfing pop-ups, sprint speed, and vertical jump. Do 8-12 reps.",
  },
  "Burpees": {
    short: "A full-body conditioning exercise combining a squat, push-up, and jump, building cardiovascular endurance and explosive power.",
    long: "From standing, drop into a squat and place your hands on the floor. Jump or step your feet back to a plank, do a push-up, then jump your feet back to your hands. Stand up and jump explosively with arms overhead. Burpees are a full-body conditioning exercise that builds cardio endurance, explosive power, and mental toughness. Scale by removing the push-up or step instead of jumping.",
  },
  "Mountain Climbers": {
    short: "A dynamic plank exercise driving knees to the chest alternately, building cardio capacity and core stability.",
    long: "Start in a high plank position. Rapidly drive one knee toward your chest, then switch legs in a running motion. Keep your hips down and core tight. The faster you go, the more cardiovascular demand. Mountain climbers build cardio endurance, core stability, and hip flexor strength simultaneously. Do 30-second intervals. Scale by slowing the tempo.",
  },
  "Single-Leg Deadlift": {
    short: "A hip-hinge exercise on one leg that builds balance, hamstring strength, and posterior chain stability.",
    long: "Hold a dumbbell in one hand. Hinge forward at the hip on one leg, letting the free leg extend straight back behind you. Lower the weight toward the floor while keeping your back flat. Stop when your torso is parallel to the floor, then return to standing. This builds single-leg balance, hamstring strength, and posterior chain stability — all critical for board sports. Do 8-12 reps per leg.",
  },
  "Bulgarian Split Squats": {
    short: "A single-leg squat with the rear foot elevated, developing quad strength, glute activation, and balance for board stability.",
    long: "Place the top of your rear foot on a bench behind you. Step forward with your front foot into a lunge position. Lower straight down by bending the front knee to 90 degrees, keeping the torso upright. Push through the front heel to stand. This exercise builds serious single-leg strength and stability, which translates directly to balance on a surfboard. Do 8-12 reps per leg.",
  },
  "Stability Ball Plank": {
    short: "A plank performed with forearms on a stability ball, increasing core activation and shoulder stabilization demands.",
    long: "Place your forearms on a stability ball and extend your legs behind you into a plank position. The instability of the ball forces your core and shoulders to work overtime to maintain balance. Keep a straight body line and breathe steadily. Hold for 30-60 seconds. This is excellent for surfers as it trains the balance and stability needed on an unstable surface.",
  },
  "Stability Ball Stir-the-Pot": {
    short: "A shoulder stability exercise making small circular movements with forearms on a stability ball, targeting the rotator cuff and serratus.",
    long: "Start in a plank with forearms on a stability ball. Make small circular movements with your forearms as if stirring a pot — 8 circles in one direction, then reverse. Keep the body stable and the core engaged. This exercise targets the rotator cuff, serratus anterior, and shoulder stabilizers — critical for paddling and shoulder health in surfing.",
  },
  "Side Plank": {
    short: "An isometric lateral core exercise balancing on one forearm, strengthening the obliques and lateral hip stabilizers.",
    long: "Balance on one forearm with your body in a straight line, feet stacked or staggered. Keep the hips elevated and the core engaged. Hold for 30-45 seconds per side. Side planks strengthen the obliques, quadratus lumborum, and lateral hip stabilizers, which are essential for rotational power and lateral stability in all sports.",
  },
  "Easy Swim or Row": {
    short: "Low-intensity swimming or rowing for aerobic endurance, mimicking the paddle demands of surfing while promoting recovery.",
    long: "Swim or row at an easy, conversational pace for 15-20 minutes. Focus on technique and smooth, relaxed movement rather than intensity. This builds the aerobic base and shoulder endurance needed for paddling while promoting blood flow and recovery. Keep it in Zone 2 heart rate — you should be able to hold a conversation.",
  },
  "Dumbbell Row": {
    short: "A unilateral pulling exercise rowing a dumbbell from a bench-supported position, targeting the lats and upper back.",
    long: "Place one knee and hand on a bench, with the other foot on the floor. Hold a dumbbell in the free hand and row it toward your hip, squeezing the shoulder blade at the top. Lower with control. Keep the torso parallel to the bench and avoid rotating. This builds unilateral pulling strength and addresses side-to-side imbalances. Do 8-12 reps per side.",
  },
  "Face Pulls (band)": {
    short: "A rear-delt and rotator-cuff exercise pulling a band toward the face, improving shoulder health and posture.",
    long: "Attach a resistance band at face height. Pull the band toward your face, letting the elbows flare out and squeezing the rear delts. The band should pass your face at ear level. This strengthens the rear delts, rotator cuff, and rhomboids — the muscles that counteract the rounded-shoulder posture from pushing and sitting. Perform 15-20 reps with control.",
  },
  "Dead Bug": {
    short: "A core coordination exercise lying on the back, extending opposite arm and leg while maintaining a braced spine.",
    long: "Lie on your back with arms extended overhead and knees bent at 90 degrees (tabletop). Slowly lower one arm overhead while extending the opposite leg, keeping the lower back pressed into the floor. Return to center and switch sides. The key is maintaining core engagement and spinal position throughout. This builds core coordination and anti-extension strength. Do 8 reps per side.",
  },
  "Goblet Squats": {
    short: "A squat variation holding a single dumbbell at the chest, building leg strength and reinforcing proper squat mechanics.",
    long: "Hold a dumbbell vertically at chest level with both hands. Squat down between your knees, keeping your chest up and elbows inside the knees. Go as deep as your mobility allows, then drive through your heels to stand. The front-loaded weight encourages an upright torso and proper depth. Goblet squats are excellent for learning squat mechanics and building leg strength. Do 8-15 reps.",
  },
  "Reverse Lunges": {
    short: "A single-leg exercise stepping backward into a lunge, building quad and glute strength with less knee stress than forward lunges.",
    long: "Stand holding dumbbells at your sides. Step one foot backward into a lunge, lowering until both knees are at 90 degrees. Push through the front heel to return to standing. Reverse lunges are easier on the knees than forward lunges because the front leg stays stationary. They build single-leg strength, glute activation, and balance. Do 10-15 reps per leg.",
  },
  "V-Ups": {
    short: "A core exercise lifting the torso and legs simultaneously into a V shape, building abdominal compression and control.",
    long: "Lie flat on your back with arms overhead. Simultaneously lift your straight legs and torso into a V shape, reaching your hands toward your feet. Lower with control. Keep the legs straight throughout. V-ups are an advanced core exercise that builds strong abdominal compression and control. Scale by bending the knees or doing alternating arm-leg raises. Do 8-15 reps.",
  },
  "Pseudo Planche Push-ups": {
    short: "Push-ups performed with a forward lean to shift weight over the fingertips, building planche-specific shoulder and core strength.",
    long: "Set up for a push-up but lean your shoulders forward past your hands, shifting weight toward the fingertips. Perform the push-up in this leaned position. The further forward you lean, the more the load shifts to the shoulders and the harder it becomes. This builds the straight-arm strength and shoulder lean needed for planche progressions. Do 8-12 reps.",
  },
  "Planche Leans": {
    short: "A static lean supporting the body on the hands with feet on the ground, building the straight-arm strength needed for planche progressions.",
    long: "Place your hands on the floor shoulder-width apart, fingers spread. Lean your shoulders forward as far as possible while keeping your feet on the ground. The goal is to shift your center of mass over your hands. Hold for 15-30 seconds. This is the primary drill for building planche-specific strength — the straight-arm shoulder lean that eventually leads to a full planche.",
  },
  "Frog Stand": {
    short: "A gymnastic balance skill resting the knees on the elbows while supporting the body on the hands, developing planche balance.",
    long: "Place your hands on the floor, fingers spread. Lean forward and rest your knees on your elbows. Slowly shift your weight forward until your feet come off the floor. Balance on your hands with knees on elbows. Hold for 10-20 seconds. This is the first planche progression and develops the balance and straight-arm strength needed for more advanced planche skills.",
  },
  "L-Sit Progression": {
    short: "A gymnastic hold supporting the body on the hands with legs extended, building core compression and straight-arm strength.",
    long: "Support yourself on parallettes or the floor with arms straight. Lift your legs straight out in front of you, forming an L shape with your body. If you cannot hold a full L-sit, start with one leg tucked and one extended, or both legs tucked. Press down hard through your hands and depress your shoulders. Hold for 10-20 seconds. This builds incredible core compression and straight-arm strength.",
  },
  "Wrist Stretch": {
    short: "Gentle stretching of the wrist flexors and extensors to maintain joint health and recover from pressing and support work.",
    long: "Extend one arm in front of you with the palm up. Use the other hand to gently pull the fingers back toward you to stretch the wrist flexors. Then flip the palm down and press the back of the hand toward you to stretch the extensors. Hold each position for 30 seconds. This maintains wrist mobility and aids recovery from heavy pressing or support work.",
  },
  "Hanging Leg Raises": {
    short: "A core exercise hanging from a bar and lifting the legs, building abdominal strength and grip endurance.",
    long: "Hang from a pull-up bar with arms straight. Lift your straight legs up to hip height or higher (to the bar for advanced). Lower with control — do not swing. Keep the core engaged and avoid using momentum. Hanging leg raises build intense abdominal strength and grip endurance simultaneously. Scale by bending the knees (tuck raises). Do 8-12 reps.",
  },
  "Barbell Back Squat": {
    short: "A foundational strength exercise with a barbell across the upper back, targeting the quads, glutes, and core for maximal leg strength.",
    long: "Set up with a barbell across your upper traps, feet shoulder-width apart. Brace your core, sit back and down, keeping your chest up and knees tracking over your toes. Descend to below parallel, then drive through your midfoot to stand. The back squat is the king of leg exercises, building maximal strength in the quads, glutes, hamstrings, and core. Work at 80-85% of your 1RM for sets of 5.",
  },
  "Barbell Bench Press": {
    short: "A primary upper-body strength exercise pressing a barbell from the chest, targeting the chest, shoulders, and triceps.",
    long: "Lie on a bench with eyes under the bar. Grip slightly wider than shoulder-width, retract your shoulder blades, and arch slightly. Lower the bar to your lower chest with control, then press up and slightly back. Keep the elbows at about 75 degrees. The bench press is the primary measure of upper-body pressing strength. Work at 80-85% of your 1RM for sets of 5.",
  },
  "Romanian Deadlift": {
    short: "A barbell hip-hinge exercise targeting the hamstrings and glutes with a controlled negative, building posterior chain strength.",
    long: "Hold a barbell with an overhand grip at hip height. Hinge at the hips with a slight knee bend, pushing your hips back and lowering the bar along your legs. Keep your back flat and feel a deep hamstring stretch. When you reach your end range, drive your hips forward to return to standing. The RDL builds hamstring and glute strength with less fatigue than conventional deadlifts.",
  },
  "DB Shoulder Press": {
    short: "An overhead pressing exercise with dumbbells, building shoulder strength and stability through a full range of motion.",
    long: "Sit or stand with dumbbells at shoulder height, palms facing forward. Press the weights overhead until arms are locked, keeping the core braced and ribs down. Lower with control to the shoulders. Dumbbells allow a more natural range of motion than a barbell and build independent shoulder strength. Do 8-12 reps.",
  },
  "DB Floor Press": {
    short: "A pressing exercise lying on the floor with dumbbells, limiting range of motion to emphasize triceps lockout strength.",
    long: "Lie on the floor with dumbbells extended overhead. Lower the weights until your triceps touch the floor, then press back up. The floor stops the range of motion, removing the chest stretch and emphasizing the triceps lockout portion of the press. This is excellent for building bench press lockout strength and triceps mass. Do 8-15 reps.",
  },
  "Conventional Deadlift": {
    short: "A maximal strength exercise lifting a barbell from the floor, engaging the entire posterior chain, core, and grip.",
    long: "Stand with feet hip-width apart, barbell over your midfoot. Hinge and bend to grip the bar. Brace your core, pull the slack out, then drive through the floor with your legs while extending your hips. Lock out at the top with hips and knees straight. Lower with control. The deadlift is the ultimate test of full-body strength, engaging everything from your calves to your traps. Work at 80-85% 1RM for 3-5 reps.",
  },
  "Barbell Bent-Over Row": {
    short: "A compound pulling exercise rowing a barbell from a hinged position, targeting the lats, rhomboids, and upper back.",
    long: "Hinge at the hips with a flat back, holding a barbell with an overhand grip. Row the bar toward your lower ribs, squeezing the shoulder blades together. Lower with control. Keep the torso angle consistent — do not stand up during the row. This builds dense upper-back strength and complements the bench press. Do 8-12 reps.",
  },
  "Overhead Press": {
    short: "A barbell shoulder press standing overhead, building full-body tension and shoulder pressing strength.",
    long: "Start with a barbell at shoulder height in a rack or from the floor. Brace your core, squeeze your glutes, and press the bar overhead until arms are locked. The bar should travel in a straight line over your head. Lower to the shoulders with control. The overhead press builds shoulder strength and full-body tension. Work at 80% 1RM for sets of 5.",
  },
  "Incline DB Press": {
    short: "A chest pressing exercise on an incline bench with dumbbells, targeting the upper chest and front deltoids.",
    long: "Set an incline bench to 30-45 degrees. Lie back with dumbbells at chest level. Press the weights up and slightly together until arms are locked. Lower with control. The incline shifts emphasis to the upper chest and front delts, building a full, balanced chest. Do 8-12 reps.",
  },
  "One-Arm DB Row": {
    short: "A unilateral dumbbell row from a bench-supported position, targeting the lats and building symmetrical back strength.",
    long: "Place one knee and hand on a bench. Hold a dumbbell in the free hand, arm extended. Row the dumbbell to your hip, squeezing the lat at the top. Lower with control. Keep the torso stable and avoid rotation. One-arm rows build symmetrical back strength and address imbalances. Do 8-12 reps per side.",
  },
  "Lateral Raises": {
    short: "A shoulder isolation exercise lifting dumbbells out to the sides, targeting the lateral deltoid for shoulder width.",
    long: "Stand with dumbbells at your sides, palms facing in. Raise the weights out to the sides until arms are parallel to the floor. Lead with the elbows and keep a slight bend. Lower slowly. Strict form is key — no swinging. Lateral raises isolate the lateral deltoid and build shoulder width. Do 12-20 reps.",
  },
  "Foam Rolling": {
    short: "A self-myofascial release technique using a foam roller to massage tight muscles, improving recovery and tissue quality.",
    long: "Use a foam roller to apply pressure to tight muscles — quads, hamstrings, calves, lats, and upper back. Roll slowly along the muscle belly, pausing on tender spots for 20-30 seconds until they release. Avoid rolling directly on joints or bones. Foam rolling improves blood flow, reduces muscle soreness, and improves tissue quality. Spend 10 minutes as part of your recovery routine.",
  },
  "Jumping Jacks": {
    short: "A classic cardio exercise jumping while spreading the arms and legs, warming up the full body and raising heart rate.",
    long: "Start standing with feet together and arms at your sides. Jump while spreading your feet wide and raising your arms overhead. Jump back to the starting position. Keep a steady rhythm for 30 seconds. Jumping jacks are a simple full-body warm-up that raises your heart rate and prepares your joints for more intense exercise.",
  },
  "High Knees": {
    short: "A cardio exercise running in place while driving the knees up to hip height, building leg endurance and cardiovascular fitness.",
    long: "Run in place while driving your knees up to hip height on each step. Pump your arms as if sprinting. Keep a fast pace for 30 seconds. High knees build cardio endurance, hip flexor strength, and coordination. Scale by reducing knee height or slowing the tempo.",
  },
  "Crunches": {
    short: "A core exercise flexing the spine on the floor, targeting the rectus abdominis with a short, controlled range of motion.",
    long: "Lie on your back with knees bent and hands behind your head. Curl your shoulders off the floor by contracting your abs, squeezing at the top. Lower with control. Do not pull on your neck. Crunches isolate the rectus abdominis through a short range of motion. Keep it controlled — 15-25 reps with good form beats 50 sloppy ones.",
  },
  "Bicycle Kicks": {
    short: "A core exercise lying on the back and pedaling the legs while rotating the torso, targeting the obliques and lower abs.",
    long: "Lie on your back with hands behind your head. Bring one knee toward your chest while extending the other leg straight. Rotate your torso to bring the opposite elbow toward the bent knee. Switch sides in a pedaling motion. Keep the lower back pressed into the floor. Bicycle kicks target the obliques and lower abs with a dynamic, rotational movement. Do 15-20 reps per side.",
  },
  "Squat Jumps": {
    short: "A plyometric exercise squatting then jumping explosively, building leg power and cardiovascular conditioning.",
    long: "Squat down with feet shoulder-width apart, then explode upward into a maximum jump. Land softly with bent knees and immediately descend into the next rep. Use your arms for momentum. Squat jumps build explosive leg power and cardio capacity. Do 10-15 reps with maximum effort on each jump.",
  },
  "Lunge Jumps": {
    short: "An explosive alternating lunge variation jumping between legs, building single-leg power and cardio endurance.",
    long: "Start in a lunge position. Jump up explosively and switch legs in the air, landing in a lunge with the opposite leg forward. Continue alternating. Keep the front knee at 90 degrees and the torso upright. Lunge jumps build single-leg power, coordination, and cardio endurance. Do 10 reps per leg.",
  },
  "Calf Raises": {
    short: "An isolation exercise lifting onto the balls of the feet, building calf strength and ankle stability.",
    long: "Stand with feet shoulder-width apart. Rise onto the balls of your feet as high as possible, squeezing the calves at the top. Lower slowly to a full stretch. For added range, stand on a step with heels hanging off. Calf raises build lower-leg strength and ankle stability. Do 15-25 reps. Scale by doing single-leg calf raises.",
  },
  "Wall Sit": {
    short: "An isometric leg exercise holding a squat position against a wall, building quad endurance and mental toughness.",
    long: "Lean your back against a wall and slide down until your thighs are parallel to the floor, knees at 90 degrees. Hold this position. Keep your weight in your heels and do not let your knees go past your toes. Wall sits build isometric quad endurance and mental toughness. Hold for 30-60 seconds.",
  },
  "Easy Walk or Jog": {
    short: "A low-to-moderate intensity walk or jog for active recovery and cardiovascular health.",
    long: "Walk or jog at a comfortable pace for 20-30 minutes. Keep it conversational — you should be able to talk without gasping. This builds aerobic base endurance and promotes recovery without adding training stress. Perfect for rest days between intense sessions.",
  },
  "Jump Rope (or imaginary)": {
    short: "A cardio exercise jumping over a rope (or mimicking the motion), building coordination, foot speed, and conditioning.",
    long: "If you have a jump rope, swing it overhead and jump with both feet as it passes under. If no rope, mimic the hand and foot motion. Keep jumps low and land on the balls of your feet. Jump rope builds coordination, foot speed, calf endurance, and cardio capacity. Do 60-second intervals with 30 seconds rest.",
  },
  "Skater Jumps": {
    short: "A lateral plyometric exercise hopping side to side on one leg, building single-leg power and lateral stability.",
    long: "Hop laterally onto one foot, letting the other leg swing behind you like a speed skater. Land softly and immediately hop back to the other side. Keep the jumps wide and controlled. Skater jumps build lateral power and single-leg stability — important for any sport with side-to-side movement. Do 10 reps per side.",
  },
  "Plank Jacks": {
    short: "A dynamic plank variation jumping the feet in and out, combining core stability with cardiovascular effort.",
    long: "Start in a high plank. Jump your feet wide and then back together, like a horizontal jumping jack. Keep your hips stable and core engaged — do not let them bounce. Plank jacks combine core stability with cardio, making them a great conditioning finisher. Do 30-second intervals.",
  },
  "Push-ups": {
    short: "A fundamental bodyweight pressing exercise targeting the chest, shoulders, and triceps through a controlled range of motion.",
    long: "Start in a plank with hands shoulder-width apart, body in a straight line. Lower your chest to the floor by bending the elbows at about 45 degrees. Press back up to full extension. Keep the core tight and do not let the hips sag. Push-ups are the most fundamental upper-body exercise and can be progressed infinitely (elevated feet, archer, one-arm). Do 12-20 reps.",
  },
  "Plank to Push-up": {
    short: "A dynamic core exercise transitioning between forearm plank and high plank, building upper-body and core endurance.",
    long: "Start in a forearm plank. Place one hand on the floor, then the other, pressing up to a high plank (push-up position). Lower back down to the forearms one arm at a time. Alternate the leading arm each rep. Keep the hips stable throughout. This builds dynamic core stability and upper-body endurance. Do 8-12 reps.",
  },
  "Triceps Dips (chair)": {
    short: "A triceps-focused dipping exercise using a chair or bench, building arm strength with minimal equipment.",
    long: "Sit on the edge of a chair with hands gripping the edge beside your hips. Slide your hips off the chair and lower your body by bending the elbows to 90 degrees. Press back up by extending the arms. Keep the elbows pointing back, not out. Chair dips build triceps strength with minimal equipment. Do 10-15 reps.",
  },
  "Child's Pose": {
    short: "A gentle resting pose kneeling and folding forward, stretching the hips, thighs, and spine while promoting relaxation.",
    long: "Kneel on the floor with big toes touching and knees apart. Fold forward, resting your forehead on the floor and arms extended or relaxed beside you. Breathe deeply and let your body relax completely. Hold for 60-90 seconds. Child's pose gently stretches the hips, thighs, and spine while calming the nervous system. Perfect for cool-downs.",
  },
  "The Hundreds": {
    short: "A classic Pilates exercise holding a curled-up position while pulsing the arms for 100 beats, building core endurance and breath control.",
    long: "Lie on your back, lift your head and shoulders, and extend your legs to a 45-degree angle (or tabletop for beginners). Pump your arms up and down in small pulses while inhaling for 5 counts and exhaling for 5 counts. Repeat for 10 cycles (100 beats total). The Hundreds builds core endurance, breath control, and warms up the entire body. Keep the lower back pressed into the floor.",
  },
  "Roll-Ups": {
    short: "A Pilates exercise articulating the spine vertebra by vertebra from lying to seated, building spinal mobility and deep core strength.",
    long: "Lie flat with arms extended overhead. Slowly peel your spine off the floor one vertebra at a time, reaching forward toward your toes. Reverse the movement to roll back down with control. The key is articulation — imagine peeling your spine off the floor like a sticker. Roll-ups build spinal mobility and deep core strength. Do 6-10 reps.",
  },
  "Single Leg Circles": {
    short: "A Pilates exercise circling one extended leg while lying on the back, building hip mobility and core stability.",
    long: "Lie on your back with one leg extended on the floor and the other lifted toward the ceiling. Circle the lifted leg across the body, down, around, and back up. Keep the hips stable and the core engaged. Reverse direction after 5 circles. This builds hip joint mobility, core stability, and pelvic control. Do 5 circles each direction per leg.",
  },
  "Criss-Cross": {
    short: "A Pilates oblique exercise twisting the torso while alternating knee pulls, targeting rotational core strength.",
    long: "Lie on your back with knees pulled into the chest. Lift your head and shoulders. Extend one leg straight while twisting the opposite elbow toward the bent knee. Switch sides in a bicycling motion. Keep the elbows wide and the twist coming from the waist, not the neck. Criss-Cross targets the obliques and rotational core strength. Do 10 reps per side.",
  },
  "Swan Dive": {
    short: "A Pilates back extension exercise arching the spine from a prone position, strengthening the spinal extensors and glutes.",
    long: "Lie face-down with arms extended overhead. Lift your chest, arms, and legs off the floor simultaneously, arching the back. Lower with control. The movement should come from the spinal extensors and glutes, not by jamming the lower back. Swan Dive builds back strength and spinal extension mobility. Do 6-10 reps.",
  },
  "Leg Swings": {
    short: "A dynamic mobility exercise swinging the leg forward and back or side to side, opening the hips and warming up the hip joint.",
    long: "Stand on one leg (hold a wall for balance). Swing the free leg forward and back dynamically, increasing the range with each swing. Then switch to side-to-side swings. Do 10 swings per direction per leg. Leg swings warm up the hip joint dynamically and improve hip mobility for running, jumping, and squatting.",
  },
  "Shoulder Bridge": {
    short: "A Pilates exercise lifting the hips into a bridge while articulating the spine, building glute strength and spinal control.",
    long: "Lie on your back with knees bent and feet flat. Peel your spine off the floor one vertebra at a time, lifting the hips into a bridge. Hold at the top, then reverse the articulation to lower. The Shoulder Bridge builds glute strength, spinal mobility, and body awareness. Do 10-15 reps with slow, controlled articulation.",
  },
  "Side Leg Kicks": {
    short: "A Pilates side-lying exercise kicking the top leg forward and back, targeting the outer thighs and glutes.",
    long: "Lie on your side with legs straight and stacked. Kick the top leg forward with a flexed foot, then swing it back behind you with a pointed toe. Keep the torso stable and the core engaged. The movement should come from the hip, not the lower back. Side leg kicks target the outer thighs, glutes, and hip stability. Do 10 reps per side.",
  },
  "Clamshells": {
    short: "A hip-strengthening exercise lying on the side and opening the knees, targeting the glute medius for hip stability.",
    long: "Lie on your side with knees bent and stacked. Keep your feet together and lift the top knee like opening a clamshell. Lower with control. Keep the pelvis stable — do not roll backward. Clamshells isolate the glute medius, which is critical for hip stability, knee health, and single-leg performance. Do 15-20 reps per side.",
  },
  "Spine Stretch Forward": {
    short: "A Pilates exercise seated and curling the spine forward, building segmental flexion and hamstring flexibility.",
    long: "Sit with legs extended shoulder-width apart. Reach forward and curl the spine forward, imagining stacking vertebrae one at a time as you reach. Reverse to sit tall. The goal is segmental spinal flexion, not just a hamstring stretch. Spine Stretch Forward builds spinal mobility and body awareness. Do 6-10 reps.",
  },
  "Saw": {
    short: "A Pilates exercise rotating and reaching across the body from a seated position, stretching the back and hamstrings.",
    long: "Sit with legs extended wide. Twist your torso and reach one hand across to the opposite foot, as if sawing it off. Rotate back to center and switch sides. The movement combines spinal rotation with a hamstring stretch. Keep the hips grounded throughout. Saw builds rotational mobility and hamstring flexibility. Do 5 reps per side.",
  },
  "Mermaid Stretch": {
    short: "A lateral stretching exercise reaching one arm overhead while side-bending, opening the side body and intercostals.",
    long: "Sit with one leg folded and the other extended to the side. Reach the opposite arm overhead and bend sideways toward the extended leg. You should feel a stretch along the side of the torso. Hold for 30 seconds per side. The Mermaid Stretch opens the intercostal muscles, lats, and lateral spine, improving lateral mobility and breathing capacity.",
  },
  "Pelvic Tilts": {
    short: "A gentle pelvic awareness exercise tilting the pelvis anteriorly and posteriorly, building core connection and lower back mobility.",
    long: "Lie on your back with knees bent and feet flat. Gently tilt your pelvis to press the lower back into the floor (posterior tilt), then arch it away from the floor (anterior tilt). Move slowly and with awareness. Pelvic tilts build the mind-body connection to the pelvic floor and lower back, which is foundational for all Pilates work. Do 10 slow reps.",
  },
  "Teaser": {
    short: "An advanced Pilates core exercise balancing on the sit bones with legs and torso in a V shape, building deep abdominal strength.",
    long: "Lie on your back with arms overhead and legs extended. Simultaneously lift your torso and legs into a V shape, balancing on your sit bones. Reach your arms toward your feet. Lower with control. The Teaser is one of the most challenging Pilates exercises, requiring deep core strength, balance, and control. Do 6-10 reps.",
  },
  "Swimming": {
    short: "A Pilates exercise lying prone and alternating opposite arm and leg lifts, strengthening the posterior chain and spinal extensors.",
    long: "Lie face-down with arms extended overhead. Lift opposite arm and leg simultaneously, then switch in a rapid, fluttering motion as if swimming. Keep the core engaged and the spine long. Swimming strengthens the entire posterior chain — spinal extensors, glutes, and hamstrings — while building coordination. Do 20 flutter reps.",
  },
  "Double Leg Stretch": {
    short: "A Pilates core exercise extending the arms and legs from a curled position then drawing them back, building deep abdominal control.",
    long: "Lie on your back curled up with knees pulled in and hands on your shins. Simultaneously extend your arms overhead and legs straight out at a 45-degree angle. Circle your arms around and draw the knees back in. The core should stay engaged throughout — do not let the lower back arch. Do 8-12 reps.",
  },
  "Scissors": {
    short: "A Pilates lower-ab exercise lying on the back and scissoring the legs vertically, building core strength and hamstring flexibility.",
    long: "Lie on your back with legs extended. Lift both legs toward the ceiling. Lower one leg toward the floor while keeping the other up, then switch in a scissoring motion. Keep the lower back pressed into the floor and the core engaged. Scissors build lower-ab strength and hamstring flexibility. Do 8 reps per leg.",
  },
  "Side Plank Dips": {
    short: "A lateral core exercise dipping the hips toward the floor from a side plank, targeting the obliques through dynamic range.",
    long: "Start in a side plank on your forearm. Lower your hip toward the floor, then lift it back up, squeezing the oblique at the top. Keep the body in a straight line — do not let the hips rotate forward or back. Side plank dips build dynamic oblique strength through a full range of motion. Do 8-12 reps per side.",
  },
  "Dynamic Leg Swings": {
    short: "A mobility drill swinging the legs through a full range of motion, warming up the hips and hamstrings for running or jumping.",
    long: "Stand next to a wall for balance. Swing one leg forward and back dynamically, gradually increasing the range of motion. Do 10 swings per leg. Then face the wall and swing one leg side to side. Dynamic leg swings warm up the hip joint through its full range, preparing the muscles and tendons for running, sprinting, or jumping.",
  },
  "Sprint Intervals": {
    short: "A high-intensity cardio exercise alternating maximum-effort sprints with walking recovery, building speed and anaerobic capacity.",
    long: "Sprint at maximum effort for 30 seconds, then walk for 90 seconds to recover. Repeat for 8 rounds. Warm up thoroughly before starting. Sprint intervals build anaerobic capacity, speed, and power. They are highly effective for cardiovascular fitness in a short time. Scale by reducing sprint duration or increasing rest.",
  },
  "Rowing Intervals": {
    short: "A power-endurance exercise on a rowing machine alternating sprint distances with rest, building full-body cardio and pulling power.",
    long: "On a rowing machine, sprint 250 meters at high power output, then rest for 60 seconds. Repeat for 6 rounds. Focus on powerful leg drive and a strong pull with the upper body. Rowing intervals build full-body cardio endurance and pulling power. Scale by reducing the distance or increasing rest.",
  },
  "Easy Steady Run": {
    short: "A conversational-pace run in Zone 2 heart rate, building aerobic base endurance without excessive fatigue.",
    long: "Run at an easy, conversational pace for 30-45 minutes. You should be able to speak in full sentences without gasping. This is Zone 2 training, which builds your aerobic base, improves mitochondrial density, and enhances fat oxidation. Easy steady runs are the foundation of any endurance program. Do not run too fast — slower is better for aerobic development.",
  },
  "Jump Rope": {
    short: "A coordination and conditioning exercise jumping over a rope, building foot speed, timing, and cardiovascular endurance.",
    long: "Jump over a rope with both feet, keeping jumps low and landing on the balls of your feet. Swing the rope with the wrists, not the arms. Start with 60-second intervals and build up. Jump rope builds coordination, foot speed, calf endurance, and cardio capacity. It is one of the most efficient cardio exercises you can do.",
  },
  "Tempo Run": {
    short: "A sustained run at a comfortably hard pace around 80% effort, building lactate threshold and mental endurance.",
    long: "After a warm-up, run at a comfortably hard pace — about 80% effort, or the fastest pace you could hold for an hour — for 20 minutes. Cool down afterward. Tempo runs build lactate threshold, which is the point where your body starts producing lactic acid faster than it can clear it. This teaches your body to sustain a fast pace for longer.",
  },
  "Lunges": {
    short: "A single-leg exercise stepping forward or backward into a knee bend, building quad, glute, and hip flexor strength.",
    long: "Step forward with one foot and lower into a lunge until both knees are at 90 degrees. Push through the front heel to return to standing. Alternate legs or do all reps on one side. Lunges build single-leg strength, balance, and hip mobility. Keep the torso upright and the front knee tracking over the toes. Do 12-15 reps per leg.",
  },
  "Cycling Intervals": {
    short: "A cardio exercise on a bike alternating hard efforts with easy recovery spins, building leg endurance and aerobic capacity.",
    long: "On a stationary or road bike, pedal at high effort for 2 minutes, then spin easy for 1 minute. Repeat for 6 rounds. Focus on high cadence and power output during the hard intervals. Cycling intervals build leg endurance, aerobic capacity, and lactate threshold without impact stress. Scale by adjusting resistance and duration.",
  },
};

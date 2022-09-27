import React, { useState, Dispatch, SetStateAction } from "react";

import "./css/App.css";
interface props {
	setPage: Dispatch<SetStateAction<string>>;
}
function App(props: props) {
	return (
		<div className="App w.screen h.screen grid grid-cols-3 grid-rows-2 from-green-700 via-white to-white bg-gradient-to-b text-white">
			<div className="row-start-1 col-start-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias natus amet voluptatem molestiae nostrum enim dicta numquam maxime quam minus, porro dolore consequatur optio eveniet consequuntur temporibus, ea fugiat a!
      Aspernatur libero consectetur consequatur! Iure ullam hic mollitia sint incidunt assumenda laboriosam non, voluptas veniam ea accusamus illo reiciendis placeat perspiciatis nihil voluptatum accusantium consectetur, a temporibus dolorem. Iure, optio.
      Modi eos ipsum explicabo dicta, nihil pariatur culpa accusamus, at eligendi excepturi id voluptates molestiae provident fugiat iste laborum iure. Quia dolorem, ipsum nulla quisquam inventore eaque dolor aut et.
      Eveniet maxime, ducimus non porro vel numquam qui sequi possimus atque nesciunt tempora quidem aspernatur. Voluptate aut quidem deleniti minima adipisci ipsum, praesentium sint commodi vel deserunt ea consectetur amet?
      Aspernatur eaque impedit, libero quibusdam et eius vero temporibus voluptatem itaque voluptas laudantium eveniet iste, obcaecati ad sit error sequi omnis debitis magni! Inventore vitae, praesentium quis dolores recusandae sint!
      Repudiandae expedita consequuntur, similique ducimus pariatur maxime nihil! Tempora, quasi adipisci ducimus sed suscipit atque nihil! Quasi, quaerat asperiores animi minus delectus eveniet veniam, eum totam eos corrupti id esse!
      Nemo, odit mollitia eaque voluptatum eligendi voluptas aliquam architecto similique excepturi ducimus quos aut voluptatem praesentium, perferendis dicta facilis? Optio alias iste cumque quidem nobis debitis quae veniam aspernatur placeat?
      Quas explicabo corrupti obcaecati rerum labore sequi doloribus tempora eos culpa commodi mollitia nesciunt unde veniam aspernatur ab laudantium autem eaque, totam quibusdam reprehenderit necessitatibus vitae quisquam! Nemo, nam accusamus!
      Quas saepe itaque enim, perferendis rerum dicta iusto harum excepturi dolores vitae quaerat repellendus quos praesentium cumque voluptate, laudantium quam ipsa corporis qui accusamus at? Nostrum eum animi blanditiis molestias.
      Pariatur unde numquam commodi odio alias, eos ullam similique odit suscipit vel ratione voluptas enim accusamus voluptatibus non delectus. Iste, ad nam adipisci eaque perferendis incidunt nostrum eos repellat provident.</div>
			<div className="row-start-2 col-start-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate laboriosam sapiente consectetur explicabo, beatae possimus quibusdam tempora, iure dolore in consequatur earum ex perferendis ducimus necessitatibus, nisi reiciendis quasi minima.
      Debitis facere sed tempore est excepturi voluptatem asperiores quas voluptatum, beatae recusandae magni at alias. Fugit cum optio repudiandae eum recusandae ipsum dicta assumenda, corporis voluptates laborum delectus. Dolorum, placeat.
      Vitae ullam perspiciatis aut sint mollitia praesentium, dolores facere corrupti porro id. Maiores quod veritatis saepe quae necessitatibus quia alias minus? Sed necessitatibus eum nostrum assumenda. Temporibus ut iusto mollitia?
      Aliquid tempora velit pariatur dolorem minima necessitatibus perferendis molestiae quos est eos accusantium beatae, soluta nostrum nobis. Sit quisquam aut necessitatibus quam odit animi magnam voluptates obcaecati facere, nihil ea.
      Ipsa cum molestias nobis, voluptatem dolorem eveniet rem nam? Consequuntur autem fuga unde exercitationem in aspernatur possimus enim maiores aliquam, molestiae tempore, delectus blanditiis nisi, illo harum necessitatibus aut rerum.</div>
			<div className="col-span-2 row-span-2 row-start-1 col-start-2 place-self-center"><img className="w-1/2 " src="./creeper.png" alt="" /></div>
		</div>
	);
}

export default App;

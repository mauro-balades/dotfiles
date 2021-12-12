import sqlalchemy
from sqlalchemy import text
from datetime import datetime, timedelta, date

def single_slug(request, single_slug):
    """
    categories = [c.category_slug for c in TutorialCategory.objects.all()]

def build(self,
            my_id: uuid.UUID,
            my_callable: Callable[[int, str, List[object], Enum], dict] = None) -> None:
    pass

def last_new_id(engine):
    result = engine.execute(text(f"select max(new_id) from tickets"))
    return int(list(result)[0][0])

def process_race_date(race_date, engine):
    new_id_offset = last_new_id(engine)

    print(f"Processing from id: {new_id_offset}")

    # sql = text(f"""
    #     with id_mapping as (
    #         select
    #             tickets.id as old_id,
    #             (rank() over (order by raw_ticket_batches.received_at, tickets.id)) + {new_id_offset} AS new_id
    #         from tickets
    #         inner join raw_ticket_batches on raw_ticket_batches.id = tickets.raw_ticket_batch_id
    #         where tickets.race_date = '{race_date}'
    #         and new_id is null
    #         order by raw_ticket_batches.received_at, tickets.id
    #     )
    #     update tickets
    #     set new_id = id_mapping.new_id
    #     from id_mapping
    #     where tickets.id = id_mapping.old_id
    # """).execution_options(autocommit=True)

    engine.execute(sql)

def new_engine():
    return sqlalchemy.create_engine("")

def race_dates():
    start_race_date = date(2018, 2, 20)
    end_race_date = date(2018, 3, 2)

    current_race_date = start_race_date

    while current_race_date <= end_race_date:
        yield current_race_date.strftime("%Y%m%d")
        current_race_date += timedelta(days=1)

def loop():
    engine = new_engine()
    total_start_time = datetime.now()

    for race_date in race_dates():
        start_time = datetime.now()
        print(f"Processing {race_date}")
        process_race_date(race_date, engine)
        print(f"Finished {race_date} took: {datetime.now() - start_time}")
        print(f"Total time: {datetime.now() - total_start_time}\n")

if __name__ == "__main__":
    loop()


def no_return(value):


    return a
    print(value)

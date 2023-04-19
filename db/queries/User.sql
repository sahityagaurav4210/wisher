CREATE FUNCTION registerNewUser(
    name VARCHAR,
    email VARCHAR,
    phone BIGINT,
    dob DATE,
    createdAt DATE,
    updatedAt DATE
) RETURNS INTEGER AS $$

DECLARE phone_exists BOOLEAN;
DECLARE user_id INT := -1;

BEGIN
SELECT
    EXISTS (
        SELECT
            1
        FROM
            "Users"
        WHERE
            "Users"."phone" = registerNewUser.phone
    ) INTO phone_exists;

IF NOT phone_exists THEN

INSERT INTO
    "Users"
VALUES
    (
        DEFAULT,
        registerNewUser.name,
        registerNewUser.email,
        registerNewUser.phone,
        registerNewUser.dob,
        registerNewUser.createdAt,
        registerNewUser.updatedAt
    ) RETURNING id INTO user_id;

END IF;

    RETURN user_id;

END;

$$ LANGUAGE plpgsql;